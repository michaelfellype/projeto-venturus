// api.js - Módulo para buscar dados de APIs externas (não usado no app principal)
// Mantido como exemplo de como usar fetch + async/await

const URL_API = 'https://api.adviceslip.com/advice';

// Busca uma frase motivacional na API
export async function buscarFrase() {
  try {
    const resposta = await fetch(URL_API, { cache: 'no-store' });
    if (!resposta.ok) throw new Error('Erro na API');

    const dados = await resposta.json();
    return dados.slip?.advice || 'Continue se esforçando! 💪';
  } catch (erro) {
    console.warn('API indisponível:', erro.message);
    return 'Continue se esforçando! 💪';
  }
}
