import User from '../models/User.js';
import Post from '../models/Post.js';
import AIChat from '../models/AIChat.js';
import DailyHealthLog from '../models/DailyHealthLog.js';
import BMIRecord from '../models/BMIRecord.js';
import SymptomLog from '../models/SymptomLog.js';
import Session from '../models/Session.js';

// 1. Admin Overview
export const getOverview = async (req, res, next) => {
  try {
    console.log('[Admin Overview] Request received from user:', req.user?.email);
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    console.log('[Admin Overview] Calculating metrics...');
    console.log('[Admin Overview] Date range: Last 7 days from', sevenDaysAgo);

    const [
      totalUsers,
      activeUsers,
      totalPosts,
      totalAIChats,
      avgBMIResult
    ] = await Promise.all([
      User.countDocuments().catch(err => {
        console.error('[Admin Overview] Error counting users:', err);
        return 0;
      }),
      User.countDocuments({ createdAt: { $gte: sevenDaysAgo } }).catch(err => {
        console.error('[Admin Overview] Error counting active users:', err);
        return 0;
      }),
      Post.countDocuments().catch(err => {
        console.error('[Admin Overview] Error counting posts:', err);
        return 0;
      }),
      AIChat.countDocuments().catch(err => {
        console.error('[Admin Overview] Error counting AI chats:', err);
        return 0;
      }),
      BMIRecord.aggregate([
        { $group: { _id: null, avgBMI: { $avg: '$bmi' } } }
      ]).catch(err => {
        console.error('[Admin Overview] Error calculating BMI:', err);
        return [{ avgBMI: 0 }];
      })
    ]);

    const avgBMI = avgBMIResult[0]?.avgBMI || 0;

    const response = {
      totalUsers: totalUsers || 0,
      activeUsers: activeUsers || 0,
      totalForumPosts: totalPosts || 0,
      totalAiChats: totalAIChats || 0,
      averageBMI: Math.round(avgBMI * 10) / 10 || 0
    };

    console.log('[Admin Overview] Response:', response);

    res.json(response);
  } catch (err) {
    console.error('[Admin Overview] Unexpected error:', err);
    res.status(500).json({ 
      error: 'Failed to fetch overview data',
      message: err.message 
    });
  }
};

// 2. User Engagement Analytics
export const getUserAnalytics = async (req, res, next) => {
  try {
    const { period = '7' } = req.query;
    const days = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Daily Active Users (DAU)
    const dau = await User.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      { $project: { date: '$_id', users: '$count', _id: 0 } }
    ]);

    // Weekly Active Users
    const wau = await User.aggregate([
      {
        $group: {
          _id: { $week: '$createdAt' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } },
      { $limit: 4 },
      { $project: { week: '$_id', users: '$count', _id: 0 } }
    ]);

    // New registrations per day
    const newRegistrations = await User.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      { $project: { date: '$_id', registrations: '$count', _id: 0 } }
    ]);

    // Active vs Inactive users (pie chart data)
    const activeUsersCount = await User.countDocuments({ status: 'active' });
    const inactiveUsersCount = await User.countDocuments({ status: 'suspended' });
    const userStatusDistribution = [
      { name: 'Active', value: activeUsersCount, count: activeUsersCount },
      { name: 'Inactive', value: inactiveUsersCount, count: inactiveUsersCount }
    ];

    // Login activity (using Session model if available, otherwise use user createdAt as proxy)
    const loginActivity = await Session.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      { $project: { date: '$_id', logins: '$count', _id: 0 } }
    ]).catch(() => []);

    res.json({
      dau,
      wau,
      newRegistrations,
      userStatusDistribution,
      loginActivity: loginActivity.length > 0 ? loginActivity : newRegistrations.map(r => ({ ...r, logins: r.registrations }))
    });
  } catch (err) {
    next(err);
  }
};

// 3. Wellness Trends
export const getWellnessTrends = async (req, res, next) => {
  try {
    // Average sleep hours
    const avgSleep = await DailyHealthLog.aggregate([
      { $match: { sleepHours: { $exists: true, $ne: null } } },
      { $group: { _id: null, avgSleep: { $avg: '$sleepHours' } } }
    ]);

    // Stress level distribution (using mood or energy level as proxy)
    const stressDistribution = await DailyHealthLog.aggregate([
      { $match: { energyLevel: { $exists: true } } },
      {
        $group: {
          _id: '$energyLevel',
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      { $project: { level: '$_id', count: 1, _id: 0 } }
    ]);

    // BMI category distribution
    const bmiDistribution = await BMIRecord.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      { $project: { category: '$_id', count: 1, _id: 0 } }
    ]);

    // Most logged symptoms
    const topSymptoms = await SymptomLog.aggregate([
      { $unwind: '$symptoms' },
      {
        $group: {
          _id: '$symptoms',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $project: { symptom: '$_id', count: 1, _id: 0 } }
    ]);

    res.json({
      avgSleepHours: Math.round((avgSleep[0]?.avgSleep || 0) * 10) / 10,
      stressDistribution,
      bmiDistribution,
      topSymptoms
    });
  } catch (err) {
    next(err);
  }
};

// 4. Forum Analytics
export const getForumAnalytics = async (req, res, next) => {
  try {
    const { period = '7' } = req.query;
    const days = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Total forum threads
    const totalThreads = await Post.countDocuments();

    // Most active topics (by tags)
    const activeTopics = await Post.aggregate([
      { $unwind: { path: '$tags', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 },
          totalLikes: { $sum: '$likes' }
        }
      },
      { $match: { _id: { $ne: null } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $project: { topic: '$_id', posts: '$count', likes: '$totalLikes', _id: 0 } }
    ]);

    // Posts per day
    const postsPerDay = await Post.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      { $project: { date: '$_id', posts: '$count', _id: 0 } }
    ]);

    // Reported posts count
    const reportedCount = await Post.countDocuments({ reported: true });

    res.json({
      totalThreads,
      activeTopics,
      postsPerDay,
      reportedCount
    });
  } catch (err) {
    next(err);
  }
};

// 5. AI Assistant Usage Analytics
export const getAIAnalytics = async (req, res, next) => {
  try {
    const { period = '7' } = req.query;
    const days = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Total AI chats
    const totalChats = await AIChat.countDocuments();

    // Queries per day
    const queriesPerDay = await AIChat.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          chats: { $sum: 1 },
          messages: { $sum: { $size: '$messages' } }
        }
      },
      { $sort: { _id: 1 } },
      { $project: { date: '$_id', chats: 1, messages: 1, _id: 0 } }
    ]);

    // Most common health topics (by mode)
    const topicsByMode = await AIChat.aggregate([
      {
        $group: {
          _id: '$mode',
          count: { $sum: 1 }
        }
      },
      { $project: { mode: '$_id', count: 1, _id: 0 } }
    ]);

    // Error/fallback responses (messages with error keywords)
    const errorKeywords = ['trouble', 'error', 'not configured', 'try again', 'having trouble'];
    const errorCount = await AIChat.aggregate([
      { $unwind: '$messages' },
      {
        $match: {
          'messages.role': 'assistant',
          'messages.content': {
            $regex: errorKeywords.join('|'),
            $options: 'i'
          }
        }
      },
      { $count: 'errors' }
    ]);

    res.json({
      totalChats,
      queriesPerDay,
      topicsByMode,
      errorCount: errorCount[0]?.errors || 0
    });
  } catch (err) {
    next(err);
  }
};

// 6. Admin Management Panel - Get All Users
export const getAllUsers = async (req, res, next) => {
  try {
    const { search = '', page = 1, limit = 50 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
          ]
        }
      : {};

    const [users, total] = await Promise.all([
      User.find(query).select('-password').sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      User.countDocuments(query)
    ]);

    res.json({ users, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    next(err);
  }
};

// Update User Role
export const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

// Update User Status (Suspend/Activate)
export const updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['active', 'suspended'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const user = await User.findByIdAndUpdate(id, { status }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

// Get Reported Posts
export const getReportedPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ reported: true })
      .populate('author', 'name email')
      .sort({ reportedCount: -1, createdAt: -1 });
    res.json({ posts });
  } catch (err) {
    next(err);
  }
};

// Delete Reported Post
export const deletePostAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// Get All Posts (for admin)
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('author', 'name role').sort({ createdAt: -1 });
    res.json({ posts });
  } catch (err) {
    next(err);
  }
};
