import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import AnimatedBackground from './components/AnimatedBackground.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Forum from './pages/Forum.jsx';
import PostDetails from './pages/PostDetails.jsx';
import GamesPage from './pages/GamesPage.jsx';
import MemoryMatch from './components/games/MemoryMatch.jsx';
import ReactionTime from './components/games/ReactionTime.jsx';
import FocusTimer from './components/games/FocusTimer.jsx';
import BreathingGame from './components/games/BreathingGame.jsx';
import MathChallenge from './components/games/MathChallenge.jsx';
import SequenceMemory from './components/games/SequenceMemory.jsx';
import Resources from './pages/Resources.jsx';

// ... other imports
import Profile from './pages/Profile.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import AdminDashboardPage from './pages/admin/Dashboard.jsx';
import UserAnalytics from './pages/admin/UserAnalytics.jsx';
import WellnessTrends from './pages/admin/WellnessTrends.jsx';
import ForumAnalytics from './pages/admin/ForumAnalytics.jsx';
import AIAnalytics from './pages/admin/AIAnalytics.jsx';
import UserManagement from './pages/admin/UserManagement.jsx';
import AIAssistant from './pages/AIAssistant.jsx';
import HealthAssistant from './components/HealthAssistant.jsx';
import GuidedActivities from './pages/GuidedActivities.jsx';
import Challenges from './pages/Challenges.jsx';
import Journal from './pages/Journal.jsx';
import Settings from './pages/Settings.jsx';
import AboutWellness from './pages/AboutWellness.jsx';
import Contact from './pages/Contact.jsx';
import Ribbons from './components/Ribbons.jsx';
import MedicalArticles from './pages/MedicalArticles.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import AssessmentIntro from './pages/AssessmentIntro.jsx';
import AssessmentQuiz from './pages/AssessmentQuiz.jsx';
import AssessmentResult from './pages/AssessmentResult.jsx';
import AllAssessments from './pages/AllAssessments.jsx';


// ... inside Routes

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="relative min-h-screen bg-surface text-slate-50">
      <Ribbons />
      {!isAdminRoute && <AnimatedBackground />}
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <HealthAssistant />}
      <main className={isAdminRoute ? '' : 'relative z-10 flex-1 w-full max-w-6xl mx-auto px-4 py-6 md:py-10'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/medical-articles" element={<MedicalArticles />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/:id" element={<PostDetails />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/memory" element={<MemoryMatch />} />
          <Route path="/games/reaction" element={<ReactionTime />} />
          <Route path="/games/focus" element={<FocusTimer />} />
          <Route path="/games/breathing" element={<BreathingGame />} />
          <Route path="/games/math" element={<MathChallenge />} />
          <Route path="/games/sequence" element={<SequenceMemory />} />
          {/* AI Chat Route Removed - Replaced by Floating Widget */}
          <Route
            path="/guided-activities"
            element={
              <ProtectedRoute>
                <GuidedActivities />
              </ProtectedRoute>
            }
          />
          <Route
            path="/challenges"
            element={
              <ProtectedRoute>
                <Challenges />
              </ProtectedRoute>
            }
          />
          <Route
            path="/journal"
            element={
              <ProtectedRoute>
                <Journal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route path="/about-wellness" element={<AboutWellness />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          {/* AI Assistant Route Restored */}
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/*" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="users" element={<UserAnalytics />} />
            <Route path="wellness" element={<WellnessTrends />} />
            <Route path="forums" element={<ForumAnalytics />} />
            <Route path="ai" element={<AIAnalytics />} />
            <Route path="manage" element={<UserManagement />} />
          </Route>

          {/* Assessment Routes */}
          <Route path="/assessments/:id" element={<AssessmentIntro />} />
          <Route path="/assessments/:id/quiz" element={<AssessmentQuiz />} />
          <Route path="/assessments/:id/result" element={<AssessmentResult />} />
          <Route path="/assessments" element={<AllAssessments />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default App;

