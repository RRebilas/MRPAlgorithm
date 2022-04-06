interface MrpRecord {
  okres: number;
  calkowiteZapotrzebowanie: number;
  planowanePrzyjecia: number;
  przewidywaneNaStanie: number;
  zapotrzebowanieNetto: number;
  planowaneZamowienia: number;
  planowanePrzyjecieZamowien: number;
}

const generateRecord = (
  zapotrzebowanie: number,
  okres: number,
  planowanePrzyjecia?: number
): MrpRecord => ({
  okres,
  calkowiteZapotrzebowanie: zapotrzebowanie,
  planowanePrzyjecia: planowanePrzyjecia ?? 0,
  przewidywaneNaStanie: 0,
  zapotrzebowanieNetto: 0,
  planowaneZamowienia: 0,
  planowanePrzyjecieZamowien: 0,
});

const records: MrpRecord[] = [];

records.push(generateRecord(10, 1));
records.push(generateRecord(15, 2));
records.push(generateRecord(5, 3, 25));
records.push(generateRecord(10, 4));
records.push(generateRecord(15, 5));
records.push(generateRecord(10, 6));

const result: MrpRecord[] = [];

records.reduce(
  (prev, curr, index) => {
    let przewidywaneNaStanie =
      prev.przewidywaneNaStanie -
      curr.calkowiteZapotrzebowanie +
      curr.planowanePrzyjecia;
    let planowanePrzyjecieZamowien;
    if (przewidywaneNaStanie < 0 && result[index - 3]) {
      result[index - 3].planowaneZamowienia = 25;
      planowanePrzyjecieZamowien = 25;
      przewidywaneNaStanie += 25;
    }
    const zapotrzebowanieNetto = planowanePrzyjecieZamowien
      ? planowanePrzyjecieZamowien - przewidywaneNaStanie
      : 0;
    const wynik = {
      okres: curr.okres,
      calkowiteZapotrzebowanie: curr.calkowiteZapotrzebowanie,
      planowanePrzyjecia: curr.planowanePrzyjecia,
      przewidywaneNaStanie,
      zapotrzebowanieNetto,
      planowaneZamowienia: curr.planowaneZamowienia,
      planowanePrzyjecieZamowien: planowanePrzyjecieZamowien ?? 0,
    };
    result.push(wynik);
    return wynik;
  },
  { przewidywaneNaStanie: 30 } as MrpRecord
);

console.log(result);
