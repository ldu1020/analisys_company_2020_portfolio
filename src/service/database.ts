/** @format */

import { firebaseDatabase } from './firebase';

//test

export function testSave(data: any) {
  firebaseDatabase //
    .ref(`/corpcode`)
    .set(data);
}

export function testSync(onUpdate: any) {
  const ref = firebaseDatabase.ref(`test/focusedData`);
  ref.on('value', (snapshot) => {
    const value = snapshot.val();
    value && onUpdate(value);
  });

  return () => ref.off();
}

export function syncData(userId: any, category: any, onUpdate: any) {
  const ref = firebaseDatabase.ref(`${userId}/${category}`);
  ref.on('value', (snapshot) => {
    const value = snapshot.val();
    value && onUpdate(value);
  });

  return () => ref.off();
}

//Todo

export function saveTodoData(
  userId: string,
  category: 'todoList' | 'topicList',
  list: any
) {
  firebaseDatabase //
    .ref(`${userId}/todoState/${category}/${list.id}`)
    .set(list);
}

export function removeTodoData(
  userId: string,
  category: 'todoList' | 'topicList',
  id: string | 'removeAll'
) {
  id === 'removeAll'
    ? firebaseDatabase.ref(`${userId}/todoState/${category}`).set(null)
    : firebaseDatabase //
        .ref(`${userId}/todoState/${category}/${id}`)
        .remove();
}

//Performence

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

export function findSomedayData(
  userId: string,
  category: 'todoPerformence' | 'whatDonePerformence',
  startAt: string,
  endAt: string,
  callback: any
) {
  const ref = firebaseDatabase.ref(`${userId}/performence/${category}`);
  ref
    .orderByKey()
    .startAt(startAt)
    .endAt(endAt)
    .on('value', (snapshot) => {
      const value = snapshot.val();
      callback(value);
    });

  return () => ref.off();
}
