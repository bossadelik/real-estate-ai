import { supabase } from '@/lib/supabaseClient';

/**
 * Service per gestire le chiamate a OpenAI tramite Supabase Edge Functions
 */
export class OpenAIService {
  /**
   * Invia una richiesta a OpenAI tramite Edge Function
   * @param {Object} options - Opzioni per la richiesta
   * @param {string} options.prompt - Il prompt dell'utente
   * @param {string} [options.systemPrompt] - Il prompt di sistema (opzionale)
   * @param {string} [options.model='gpt-4'] - Il modello da utilizzare
   * @param {number} [options.maxTokens=1000] - Numero massimo di token
   * @returns {Promise<Object>} Risposta di OpenAI
   */
  static async sendChatRequest({ prompt, systemPrompt, model = 'gpt-4', maxTokens = 1000 }) {
    try {
      const { data, error } = await supabase.functions.invoke('openai-chat', {
        body: JSON.stringify({
          prompt,
          systemPrompt,
          model,
          maxTokens
        })
      });

      if (error) {
        throw new Error(`Supabase Function Error: ${error.message}`);
      }

      if (data.error) {
        throw new Error(`OpenAI Error: ${data.error}`);
      }

      return {
        success: true,
        content: data.content,
        usage: data.usage,
        model: data.model
      };

    } catch (error) {
      console.error('OpenAI Service Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Ottimizza la descrizione di un immobile
   * @param {string} title - Titolo dell'annuncio
   * @param {string} description - Descrizione originale
   * @returns {Promise<Object>} Descrizione ottimizzata
   */
  static async optimizeRealEstateDescription(title, description) {
    const systemPrompt = `Sei un esperto copywriter specializzato in annunci immobiliari. 
Il tuo compito è riscrivere e ottimizzare descrizioni di immobili per renderle più accattivanti e professionali.

Regole:
- Mantieni tutte le informazioni tecniche importanti (mq, locali, posizione)
- Usa un linguaggio persuasivo ma professionale
- Evidenzia i punti di forza dell'immobile
- Crea un senso di urgenza e desiderabilità
- Massimo 200 parole
- Scrivi in italiano`;

    const prompt = `Titolo: ${title}

Descrizione originale: ${description}

Riscrivi questa descrizione rendendola più accattivante e professionale per un annuncio immobiliare.`;

    return await this.sendChatRequest({
      prompt,
      systemPrompt,
      model: 'gpt-4',
      maxTokens: 300
    });
  }

  /**
   * Genera prompt per l'ottimizzazione delle immagini
   * @param {string} propertyType - Tipo di proprietà (es. "appartamento", "villa")
   * @param {string} roomType - Tipo di stanza (es. "soggiorno", "cucina", "bagno")
   * @returns {string} Prompt ottimizzato per l'editing delle immagini
   */
  static generateImageOptimizationPrompt(propertyType = 'immobile', roomType = 'ambiente') {
    return `Enhance this photo of a ${roomType} in a ${propertyType} to make it more appealing for real estate listing purposes.
Keep the original layout, furniture, and perspective, but improve lighting, sharpness, and clarity.
Remove clutter, balance colors, and simulate a soft natural light. Avoid any artificial staging or fictional elements.
Preserve architectural fidelity, and ensure the final image is framed in a 16:9 aspect ratio.`;
  }
}