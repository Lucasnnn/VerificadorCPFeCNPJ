// Funcoes Principais |||

function VerificarCpfCnpj(valor) {
 
  valida = CpfouCnpj(valor);
  valor = valor.toString();
  valor = valor.replace(/[^0-9]/g, "");

  if (valida === "CPF") {
    return ValidarCpf(valor);
  } else if (valida === "CNPJ") {
    return ValidarCnpj(valor);
  } else {
    return false;
  }
}

function FomatarCpfCnpj(valor) {
  formatado = false;
  valida = CpfouCnpj(valor);

  valor = valor.toString();
  valor = valor.replace(/[^0-9]/g, "");

  if (valida === "CPF") {
    if (ValidarCpf(valor)) {
      formatado = valor.substr(0, 3) + ".";
      formatado += valor.substr(3, 3) + ".";
      formatado += valor.substr(6, 3) + "-";
      formatado += valor.substr(9, 2) + "";
    }
  } else if (valida === "CNPJ") {
    if (ValidarCnpj(valor)) {
      formatado = valor.substr(0, 2) + ".";
      formatado += valor.substr(2, 3) + ".";
      formatado += valor.substr(5, 3) + "/";
      formatado += valor.substr(8, 4) + "-";
      formatado += valor.substr(12, 14) + "";
    }
  }
  return formatado;
}

// Funcoes Secundarias |||

function CpfouCnpj(valor) {

  valor = valor.toString();
  valor = valor.replace(/[^0-9]/g, "");

  if (valor.length === 11) {
    return "CPF";
  } else if (valor.length === 14) {
    return "CNPJ";
  } else {
    return false;
  }
}

function CalcularDigitos(digitos, posicoes = 10, soma_digitos = 0) {
  digitos = digitos.toString();

  for (i = 0; i < digitos.length; i++) {
    soma_digitos = soma_digitos + digitos[i] * posicoes;
    posicoes--;
    if (posicoes < 2) {
      posicoes = 9;
    }
  }

  soma_digitos = soma_digitos % 11;

  if (soma_digitos < 2) {
    soma_digitos = 0;
  } else {
    soma_digitos = 11 - soma_digitos;
  }

  cpf = digitos + soma_digitos;

  return cpf;
}

function ValidarCpf(valor) {
  
   if (valor == "00000000000" ||
    valor == "11111111111" ||
    valor == "22222222222" ||
    valor == "33333333333" ||
    valor == "44444444444" ||
    valor == "55555555555" ||
    valor == "66666666666" ||
    valor == "77777777777" ||
    valor == "88888888888" ||
    valor == "99999999999") {
    return false;
  }
  
  valor = valor.toString();
  valor = valor.replace(/[^0-9]/g, "");

  digitos = valor.substr(0, 9);

  novo_cpf = CalcularDigitos(digitos);
  novo_cpf = CalcularDigitos(novo_cpf, 11);

  if (novo_cpf === valor) {
    return true;
  } else {
    return false;
  }
}

function ValidarCnpj(valor) {
  valor = valor.toString();

  valor = valor.replace(/[^0-9]/g, "");

  cnpj_original = valor;

  primeiros_numeros_cnpj = valor.substr(0, 12);

  primeiro_calculo = CalcularDigitos(primeiros_numeros_cnpj, 5);

  segundo_calculo = CalcularDigitos(primeiro_calculo, 6);

  cnpj = segundo_calculo;

  if (cnpj === cnpj_original) {
    return true;
  }
  return false;
}

// Testador |||

const x = VerificarCpfCnpj('CPF ou CNPJ para teste');
console.log(x);
