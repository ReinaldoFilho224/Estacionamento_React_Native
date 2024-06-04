function adicionarZero(numero) {
    return numero < 10 ? `0${numero}` : numero;
}

export const timeConverter = (time) => {
    const horaEntradaEmMilissegundos = time * 1000 + time / 1000000;
    const horaEntrada = new Date(horaEntradaEmMilissegundos);
    const dia = adicionarZero(horaEntrada.getDate());
    const mes = adicionarZero(horaEntrada.getMonth() + 1);
    const ano = horaEntrada.getFullYear();
    const hora = adicionarZero(horaEntrada.getHours());
    const minuto = adicionarZero(horaEntrada.getMinutes());
    const segundo = adicionarZero(horaEntrada.getSeconds());
    const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
    return dataFormatada
}