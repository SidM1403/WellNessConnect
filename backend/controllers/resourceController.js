import Resource from '../models/Resource.js';

export const getResources = async (req, res, next) => {
  try {
    const { category, type } = req.query;
    const query = {
      ...(category ? { category } : {}),
      ...(type ? { type } : {})
    };
    const resources = await Resource.find(query).sort({ createdAt: -1 });
    res.json({ resources });
  } catch (err) {
    next(err);
  }
};

export const createResource = async (req, res, next) => {
  try {
    const resource = await Resource.create(req.body);
    res.status(201).json({ resource });
  } catch (err) {
    next(err);
  }
};

export const deleteResource = async (req, res, next) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resource deleted' });
  } catch (err) {
    next(err);
  }
};

