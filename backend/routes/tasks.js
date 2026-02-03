import { Router } from "express";

const router = Router();
router.get("/", (req, res) => {
    console.log("get tasks");
})
router.post("/", (req, res) => {
    console.log("post tasks");
})
router.get("/:id", (req, res) => {
    console.log("get task with id");
})
router.delete("/:id", (req, res) => {
    console.log("delete task with id");
})
router.patch("/:id/toggle", (req, res) => {
    console.log("toggle");
})
export default router;