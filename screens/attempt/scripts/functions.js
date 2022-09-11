function lerp(A,B,t){
    return A+(B-A)*t;
}

const PI = Math.PI;

function decimal_digs(num, num_of_decimal_digs){
    num *= Math.pow(10,num_of_decimal_digs);
    num = parseInt(num);
    num /= Math.pow(10,num_of_decimal_digs);
    return num;
}