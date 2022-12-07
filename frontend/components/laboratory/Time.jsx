import { add, eachDayOfInterval, format } from "date-fns-jalali";
import formatEn from "date-fns/format";
import React, { useState } from "react";

export default function Time(props) {
  const { selected, setSelected, disabled } = props;
  // const [selected,setSelected] = useState([])
  const now = new Date();
  const days = eachDayOfInterval({
    start: add(now, { days: 1 }),
    end: add(now, { days: 7 }),
  });
  const times = [
    { start_time: "09:00:00", end_time: "12:00:00", value: "۹ تا ۱۲" },
    { start_time: "12:00:00", end_time: "15:00:00", value: "۱۲ تا ۱۵" },
    { start_time: "15:00:00", end_time: "18:00:00", value: "۱۵ تا ۱۸" },
    { start_time: "18:00:00", end_time: "21:00:00", value: "۱۸ تا ۲۱" },
  ];

  const toggleItem = (item) => {
    if (disabled) return;
    if (
      selected.findIndex(
        (i) => i.start_time == item.start_time && i.date == item.date
      ) > -1
    ) {
      // if (item>-1 is in list) and remove from list)
      setSelected(
        selected.filter(
          (i) => i.start_time !== item.start_time || i.date !== item.date
        )
      );
    } else {
      //if (item ==-1 isnt in list) add to list
      setSelected([...selected, item]);
    }
  };

  return (
    <div className="flex flex-col rounded-3xl border-solid border border-gray gap-2 p-4 text-sm self-stretch">
      {days.map((day) => (
        <div className="flex justify-between gap-6 flex-grow">
            <div
              className={`border border-solid  ${
                selected.findIndex(
                  (i) => i.date == formatEn(day, "yyyy-MM-dd")
                ) > -1
                  ? "border-primary"
                  : "border-gray"
              } p-2 basis-[200px] flex-shrink rounded-lg flex items-center justify-center flex-col`}
            >
              <div className="font-bold text-sm">{format(day, "EEEE")}</div>
              <div className="text-xs">{format(day, "dd MMMM")}</div>
            </div>
          <div className="flex gap-2 flex-grow">
            {times.map((t) => (
              <div
                onClick={() =>
                  toggleItem({ ...t, date: formatEn(day, "yyyy-MM-dd") })
                }
                className={`border border-solid flex-grow ${
                  selected.findIndex(
                    (i) =>
                      i.start_time == t.start_time &&
                      i.date == formatEn(day, "yyyy-MM-dd")
                  ) > -1
                    ? "border-primary"
                    : "border-gray"
                } p-2 w-[100px] rounded-lg flex items-center justify-center flex-col`}
              >
                <div className=" text-sm">{t.value}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
