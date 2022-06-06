import { PDFExtract } from 'pdf.js-extract';
import FOL from '../models/FOL';
import { IFol, IFolDocument } from '../types/fol';

export async function findFolById(id: string) {
  const pdfExtract = new PDFExtract();
  const options = {};
  const doc = await pdfExtract.extract('./files/FOL-MUS.pdf', options);
  for (let i = 0; i < doc.pages.length; i++) {
    if (doc.pages[i].content[0].str.includes(id)) {
      return doc.pages[i].pageInfo.num;
    }
  }
}

export async function saveNotifiedUsers(folTitle: string, userIds) {
  const fol: IFolDocument = await FOL.findOne({ title: folTitle });

  for (let count in userIds) {
    fol.notifiedUsers.users.push({ userId: userIds[count] });
  }

  await fol.save();
}

export async function notifiedUsers(folTitle) {
  const fol: IFol = await FOL.findOne({ title: folTitle });
  let usersIds = []
  for (let i = 0; i < fol.notifiedUsers.users.length; i++) {
    usersIds.push(fol.notifiedUsers.users[i].userId)
  }
  return usersIds;
}

export async function listAllFols() {
  const fols: IFol = await FOL.find();

  return fols;
}

export async function saveViewedUsers(folTitle: string, userId: string) {
  const fol: IFolDocument = await FOL.findOne({ title: folTitle });
  if (userId! in fol.viewsByUsers.users) {
    fol.viewsByUsers.users.push({ userId: userId });

    await fol.save();
  }
}

export async function viewedUsers(folTitle) {
  const fol: IFol = await FOL.findOne({ title: folTitle });
  let usersIds = []
  for (let i = 0; i < fol.viewsByUsers.users.length; i++) {
    usersIds.push(fol.viewsByUsers.users[i].userId)
  }
  return usersIds;
}

export async function notifiedUsersByEquipments(equipments) {
  equipments = equipments.split(",")
  let folCount = 0;
  for (let i = 0; i <= equipments.length; i++) {
    await FOL.countDocuments({ equipment: equipments[i] }, function (err, count) {
      folCount = folCount + count
    })
  }

  return folCount;
}
