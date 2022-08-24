import React from "react";
function SortData(Component) {
  class SortedData extends React.Component {
    render() {
      if (Component.name === "YearTable") {
        return <Component list={sortByYear(this.props.list)} />;
      }
      if (Component.name === "MonthTable") {
        return <Component list={sortByMonth(this.props.list)} />;
      }
      return <Component list={sortList(this.props.list)} />;
    }
  }

  SortedData.displayName = `SortedData(${getDisplayName(Component)})`;
  return SortedData;
}

function sortList(data) {
  return data.sort((a, b) => new Date(a.date) - new Date(b.date));
}

function sortByMonth(data) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  //Примем что текущий год - 2018.
  const currentYear = data.filter((item) => item.date.split("-")[0] === "2018");
  let amounts = new Array(12).fill(0);
  for (let item of currentYear) {
    const month = +item.date.split("-")[1] - 1;
    amounts[month] += item.amount;
  }
  let result = [];
  for (let i = 0; i < months.length; i++) {
    result.push({
      month: months[i],
      amount: amounts[i],
    });
  }
  return result;
}

function sortByYear(arr) {
  let data = [];
  for (let i in arr) {
    data.push({
      date: arr[i].date.split("-")[0],
      amount: arr[i].amount,
    });
  }

  let map = new Map();
  for (let item of data) {
    if (map.has(item.date)) {
      const sum = map.get(item.date) + item.amount;
      map.set(item.date, sum);
    } else {
      map.set(item.date, item.amount);
    }
  }
  let result = [];
  for (let item of map) {
    result.push({
      year: item[0],
      amount: item[1],
    });
  }
  result.sort((a, b) => a.year - b.year);
  return result;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default SortData;
