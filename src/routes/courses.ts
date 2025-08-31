import { Router, Request, Response, NextFunction } from "express";
import { CourseModel } from "../models/Course";

const router = Router();

// List courses
router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await CourseModel.find().limit(100).lean();
    res.json(items);
  } catch (e) { next(e); }
});

// Get by id
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await CourseModel.findById(req.params.id).lean();
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (e) { next(e); }
});

// Create
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, syllabus, schedule } = req.body;
    if (!title) return res.status(400).json({ error: "title is required" });
    const created = await CourseModel.create({ title, syllabus, schedule });
    res.status(201).json(created);
  } catch (e) { next(e); }
});

// Update
router.patch("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await CourseModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (e) { next(e); }
});

// Delete
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await CourseModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
