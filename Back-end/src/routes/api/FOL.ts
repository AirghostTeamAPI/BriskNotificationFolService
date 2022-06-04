import FOL from "../../models/FOL";
import HttpStatusCodes from "http-status-codes";
import { Request, Response, Router } from 'express';
import { findFolById, listAllFols, notifiedUsers, notifiedUsersByEquipments, saveViewedUsers, viewedUsers } from "../../services/fol";
import { verifyJwtToken } from "../../services/session";

const router: Router = Router();

router.get("/fols", async (req: Request, res: Response) => {
  try {
    const user = await verifyJwtToken(req.headers.authorization)
    if (!user) return res.status(401).send("Unauthorized");

    let fols;
    fols = await FOL.find({ ...(req.query.search && { keywords: { "$regex": req.query.search, "$options": "i" } }), ...(req.query.equipment && { equipment: req.query.equipment }) });
    if (!fols.length) {
      fols = await FOL.find({ ...(req.query.search && { issue_description: { "$regex": req.query.search, "$options": "i" } }), ...(req.query.equipment && { equipment: req.query.equipment }) });
    }
    return res.status(HttpStatusCodes.OK).json(fols);
  } catch (err) {
    console.error((err as Error).message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.get("/fols/category", async (req: Request, res: Response) => {
  try {
    const user = await verifyJwtToken(req.headers.authorization)
    if (!user) return res.status(401).send("Unauthorized");

    const fols = await FOL.find({ ...(req.query.search && { category: { "$regex": req.query.search, "$options": "i" } }), ...(req.query.equipment && { equipment: req.query.equipment }) });
    return res.status(HttpStatusCodes.OK).json(fols);
  } catch (err) {
    console.error((err as Error).message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.get("/fols/categories", async (req: Request, res: Response) => {
  try {
    const user = verifyJwtToken(req.headers.authorization)
    if (!user) res.status(401).send("Unauthorized");

    const fols = await FOL.find({ ...(req.query.equipment && { equipment: req.query.equipment }) });
    let categories = new Set();
    for (let i = 0; i < fols.length; i++) {
      categories.add(fols[i].category);
    }
    return res.status(HttpStatusCodes.OK).json(Array.from(categories));
  } catch (err) {
    console.error((err as Error).message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.get("/fol/:folId/:folYear", async (req: Request, res: Response) => {
  try {
    const foundFol = await findFolById(req.params.folId + '/' + req.params.folYear);

    return res.status(HttpStatusCodes.OK).json(foundFol);
  } catch (err) {
    console.error((err as Error).message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.get("/fols/notifiedUsers", async (req: Request, res: Response) => {
  try {
    const notifiedUser = await notifiedUsers(req.query.title);

    return res.status(HttpStatusCodes.OK).json(notifiedUser);
  } catch (err) {
    console.error((err as Error).message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.get("/fols", async (req: Request, res: Response) => {
  try {
    const fols = await listAllFols()

    return res.status(HttpStatusCodes.OK).json(fols);
  } catch (err) {
    console.error((err as Error).message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.get("/fols/viewedBy", async (req: Request, res: Response) => {
  try {
    const folNotifiedUsersByEquipment = await notifiedUsersByEquipments(req.query.equipment);

    return res.status(HttpStatusCodes.OK).json(folNotifiedUsersByEquipment);
  } catch (err) {
    console.error((err as Error).message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.get("/fols/viewedUsers", async (req: Request, res: Response) => {
  try {
    const viewedUser = await viewedUsers(req.query.title);

    return res.status(HttpStatusCodes.OK).json(viewedUser);
  } catch (err) {
    console.error((err as Error).message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.post("/fols/viewedUsers", async (req: Request, res: Response) => {
  try {
    const user = await verifyJwtToken(req.headers.authorization)
    if (!user) return res.status(401).send("Unauthorized");

    const viewedUser = await saveViewedUsers(req.query.title as string, user.id);

    return res.status(HttpStatusCodes.OK).json(viewedUser);
  } catch (err) {
    console.error((err as Error).message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.post("/fols/notifiedUsers", async (req: Request, res: Response) => {
  try {
    const fol = await FOL.findById(req.body.id);
    if (!fol) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({ message: "FOL not found" });
    }
    for (let userId in req.body.notifiedUsers) {
      fol.notifiedUsers.push(req.body.notifiedUsers[userId]);
    }
    await fol.save();
    return res.status(HttpStatusCodes.OK).json(fol);
  } catch (err) {
    console.error((err as Error).message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

export default router;