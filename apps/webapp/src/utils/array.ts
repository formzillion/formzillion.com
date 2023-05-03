export const groupBy = (arr = [], lambda: any) => {
  return arr.reduce((groups: any, current: any) => {
    var val = lambda(current);
    var index = groups.findIndex((x: any) => x.key == val);

    if (index < 0) {
      index = groups.push({ key: val, items: [] }) - 1;
    }

    groups[index].items.push(current);
    return groups;
  }, []);
};

export const groupByYear = (arr: any) => {
  let response: any = {};
  arr.forEach((d: any) => {
    for (var k in d) {
      var _ = k.split("-");
      var year = _[0];
      var month = _[1];
      if (!response[year]) response[year] = { total: 0 };
      response[year][month] = response[year][month]
        ? response[year][month] + d[k]
        : d[k];
      response[year].total += d[k];
    }
  });
  return response;
};

export const sortByKey = (arr: any, key: any) => {
  return arr.sort((a: any, b: any) => (a[key] < b[key] ? 1 : -1));
};

export const sortDate = (arr: any, key: any) => {
  return arr.sort((a: any, b: any) => {
    const item = arr[key];
    return 0;
  });
};

export const range = (start: any, stop: any) =>
  Array.from({ length: stop - start + 1 }, (_, i) => start + i);
