import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import roundN from '../util/round';

// 合計時間
export const totalTimeAtom = atomWithStorage('totalTime', 0);
// 深夜時間
export const midnightTimeAtom = atomWithStorage('midnightTime', 0);

// 時給
export const hourlyWageAtom = atomWithStorage('hourlyWage', 0);

// 給料
export const wageAtom = atom((get) => {
  const totalTime = get(totalTimeAtom) || 0;
  const midnightTime = get(midnightTimeAtom) || 0;
  const hourlyWage = get(hourlyWageAtom) || 0;

  const totalTimeH = Math.floor(totalTime);
  const totalTimeM = roundN((totalTime - totalTimeH) / 0.6, 3);

  const midnightTimeH = Math.floor(midnightTime);
  const midnightTimeM = roundN((midnightTime - midnightTimeH) / 0.6, 3);

  const wage = Math.floor(
    totalTimeH * hourlyWage +
      totalTimeM * hourlyWage +
      midnightTimeH * hourlyWage * 0.25 +
      midnightTimeM * hourlyWage * 0.25,
  );
  return wage;
});

// 推定月給
export const monthlyWageAtom = atom((get) => {
  const wage = get(wageAtom);

  // 今日の日付
  const now = new Date();
  now.setHours(now.getHours() - 5);
  const d = now.getDate();

  // 月の日数
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  // 推定月給
  const monthlyWage = Math.floor((wage / d) * lastDay);
  return monthlyWage;
});
