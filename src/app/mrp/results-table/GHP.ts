class GHP {
  private _totalDemand: number[] = [];
  constructor(
    private _inStock: number,
    private _predictedDemand: number[],
    private _batchSize: number,
    private _productionDays: number[]
  ) {
    this.calculateGHP();
  }

  calculateGHP() {
    this._predictedDemand.reduce((prev, curr, index) => {
      const production = this._productionDays.some((day) => day === index + 1)
        ? this._batchSize
        : 0;
      const result = prev - curr + production;
      this._totalDemand.push(result);
      return result;
    }, this._inStock);
  }

  getTotalDemand() {
    return this._totalDemand;
  }
}

const ghp = new GHP(20, [5, 5, 5, 5, 5, 5, 15, 15, 15, 15], 30, [4, 8, 10]);
