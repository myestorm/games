export default class Algorithm {
  /**
   * @constructor
   * @param {Object} props 参数
   * @param {number} props.col 列
   * @param {string} props.row 行
   */
  constructor (props) {
    this.config = props;
  }
  randomGetArray (arr = []) {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
  }
  // 随机生成2和4
  random24 () {
    return this.randomGetArray([2, 4]);
  };

  // 获取数组中所有为0的索引值
  getZeroIndex (arr = []) {
    const res = [];
    arr.map((val, index) => {
      if (val === 0) {
        res.push(index);
      }
    });
    return res;
  };

  initData () {
    const initData = [
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0
    ];
    const val = this.random24();
    const zeroArr = this.getZeroIndex(initData);
    const index = this.randomGetArray(zeroArr)
    initData[index] = val;
    return initData;
  }

  randomData (data) {
    const val = this.random24();
    const zeroArr = this.getZeroIndex(data);
    const index = this.randomGetArray(zeroArr)
    data[index] = val;
    return data;
  }

  swipeleft (data) {
    let score = 0;
    let result = [];

    const { col, row } = this.config;
    const group = [];
    for (let i = 0; i < data.length; i++) {
      const index = Math.floor(i / col);
      if (group[index]) {
        group[index].push(data[i]);
      } else {
        group[index] = [data[i]];
      }      
    }
    group.map(g => {
      const n = [];
      const o = [];
      g.map((k, index) => {
        if (k === 0) {
          o.push(0);
        } else {
          const next = g[index + 1];
          if (next === undefined) {
            n.push(k);
          } else {
            if (next === k) {
              n.push(k * 2);
              g.splice(index + 1, 1);
              o.push(0);
              score += (k * 2);
            } else {
              n.push(k);
            }
          }
        }
      });
      result = result.concat(n, o);
    });
    return {
      result,
      score
    };
  }

  swiperight (data) {
    let score = 0;
    let result = [];

    const { col, row } = this.config;
    const group = [];
    for (let i = 0; i < data.length; i++) {
      const index = Math.floor(i / col);
      if (group[index]) {
        group[index].unshift(data[i]);
      } else {
        group[index] = [data[i]];
      }      
    }
    group.map(g => {
      const n = [];
      const o = [];
      g.map((k, index) => {
        if (k === 0) {
          o.unshift(0);
        } else {
          const next = g[index + 1];
          if (next === undefined) {
            n.unshift(k);
          } else {
            if (next === k) {
              n.unshift(k * 2);
              g.splice(index + 1, 1);
              o.unshift(0);
              score += (k * 2);
            } else {
              n.unshift(k);
            }
          }
        }
      });
      result = result.concat(o, n);
    });
    return {
      result,
      score
    };;
  }

  swipeup (data) {
    let score = 0;
    let result = [];

    const { col, row } = this.config;
    let group = [];
    for (let i = 0; i < data.length; i++) {
      const index = i % col;
      if (group[index]) {
        group[index].push(data[i]);
      } else {
        group[index] = [data[i]];
      }      
    }
    group = group.map(g => {
      const n = [];
      const o = [];
      g.map((k, index) => {
        if (k === 0) {
          o.push(0);
        } else {
          const next = g[index + 1];
          if (next === undefined) {
            n.push(k);
          } else {
            if (next === k) {
              n.push(k * 2);
              g.splice(index + 1, 1);
              o.push(0);
              score += (k * 2);
            } else {
              n.push(k);
            }
          }
        }
      });
      return [].concat(n, o);
    });
    for (let i = 0; i < col; i++) {
      for (let j = 0; j < row; j++) {
        result.push(group[j][i]);
      }
    }
    return {
      result,
      score
    };;
  }

  swipedown (data) {
    let score = 0;
    let result = [];

    const { col, row } = this.config;
    let group = [];
    for (let i = 0; i < data.length; i++) {
      const index = i % col;
      if (group[index]) {
        group[index].unshift(data[i]);
      } else {
        group[index] = [data[i]];
      }      
    }
    group = group.map(g => {
      const n = [];
      const o = [];
      g.map((k, index) => {
        if (k === 0) {
          o.unshift(0);
        } else {
          const next = g[index + 1];
          if (next === undefined) {
            n.unshift(k);
          } else {
            if (next === k) {
              n.unshift(k * 2);
              g.splice(index + 1, 1);
              o.unshift(0);
              score += (k * 2);
            } else {
              n.unshift(k);
            }
          }
        }
      });
      return [].concat(o, n);
    });
    for (let i = 0; i < col; i++) {
      for (let j = 0; j < row; j++) {
        result.push(group[j][i]);
      }
    }
    return {
      result,
      score
    };;
  }

  getGameOver (data = []) {
    if (data.includes(0)) {
      return false;
    } else {
      const left = this.swipeleft(data).result;
      if (left.join('') === data.join('')) {
        const right = this.swiperight(data).result;
        if (right.join('') === data.join('')) {
          const up = this.swipeup(data).result;
          if (up.join('') === data.join('')) {
            const down = this.swipedown(data).result;
            if (down.join('') === data.join('')) {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }

  computeOffsetTop () {
    let fixedGameOffset = 0;
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;
    const main = screenWidth - 12 * 2;
    const tool = 126;
    const foot = 160;
    const distance = screenHeight - (main + tool + foot);
    if (distance > 50) {
      fixedGameOffset = distance - 30;
    }
    return fixedGameOffset;
  }

};
