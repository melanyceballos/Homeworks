function esParOImparRegular(numero) {
    if (typeof numero !== 'number') {
        console.log("Por favor, ingrese un número válido.");
        return;
    }

    if (numero % 2 === 0) {
        console.log(`[Regular Function] El número ${numero} es PAR.`);
    } else {
        console.log(`[Regular Function] El número ${numero} es IMPAR.`);
    }
}

const esParOImparArrow = (numero) => {
    if (typeof numero !== 'number') return console.log("Por favor, ingrese un número válido.");

    const resultado = numero % 2 === 0 ? "PAR" : "IMPAR";
    console.log(`[Arrow Function] El número ${numero} es ${resultado}.`);
};

esParOImparRegular(10); 
esParOImparRegular(7);  

esParOImparArrow(42);  
esParOImparArrow(15);  