const CategoryModel = require("../models/categoryModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = Math.abs(req.query.page * 1 || 1);
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, data: categories });
});

// @desc    Get specific category by id
// @route   Get  /api/v1/categories/:id
// @access  Public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const category = await CategoryModel.findById(id);
  if (!category) {
    return next(new ApiError(`No category for this id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc    Update specific category by id
// @route   Put  /api/v1/categories/:id
// @access  Private
exports.updateCategory = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
  const { name } = req.body;
  const slug = slugify(name);
  const category = await CategoryModel.findByIdAndUpdate(
    { _id: id },
    { name, slug },
    { new: true }
  );
  if (!category) {
    return next(new ApiError(`No category for this id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc    Create Category
// @route   POST  /api/v1/categories
// @access  Private
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const slug = slugify(name);
  const category = await CategoryModel.create({ name, slug });
  res.status(201).json({ data: category });
});

// @desc    Delete specific category by id
// @route   Delete  /api/v1/categories/:id
// @access  Private
exports.deleteCategory = asyncHandler(async (req, res,next) => {
  const { id } = req.params;

  const category = await CategoryModel.findByIdAndDelete({ _id: id });
  if (!category) {
    return next(new ApiError(`No category for this id ${id}`, 404));
  }
  res.status(200).json();
});
