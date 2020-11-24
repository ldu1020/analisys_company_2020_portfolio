/** @format */

import { firebaseDatabase } from './firebase';

//test

export function testSave(data: any, corp_name: string) {
  firebaseDatabase //
    .ref(`test/corpListDataForError/${corp_name}`)
    .set(data);

  console.log('ok save..');
}

export function testSync(onUpdate: any) {
  const ref = firebaseDatabase.ref(`test/corpListDataForError`);
  ref.on('value', (snapshot) => {
    const value = snapshot.val();
    value && onUpdate(value);
  });

  return () => ref.off();
}

export function findCorpCodeOfDB(corp_name: string, callback: any) {
  const ref = firebaseDatabase.ref(`/corpcode`);
  ref
    .orderByKey()
    .equalTo(corp_name)
    .on('value', (snapshot) => {
      const value = snapshot.val();
      callback(value);
    });

  return () => ref.off();
}
