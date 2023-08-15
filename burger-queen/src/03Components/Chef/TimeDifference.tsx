import React from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { TimeDifferenceProps } from "../Interfaces";
dayjs.extend(duration);

export const TimeDifference: React.FC<TimeDifferenceProps> = ({
  dateEntry,
  dateProcessed,
}) => {
  const calcularTiempoTranscurrido = () => {
    const inicio = dayjs(dateEntry);
    const fin = dayjs(dateProcessed);
    const diferencia = dayjs.duration(fin.diff(inicio));

    const horas = String(diferencia.hours()).padStart(2, "0");
    const minutos = String(diferencia.minutes()).padStart(2, "0");
    const segundos = String(diferencia.seconds()).padStart(2, "0");

    return `${horas}:${minutos}:${segundos}`;
  };

  return (
    <div>
      <p>{calcularTiempoTranscurrido()}</p>
    </div>
  );
};
