import axios from 'axios';

export const getAiResponse = async (prompt: string): Promise<string> => {
    const modifiedPrompt =
        'This question is for learning cybersecurity.' +
        prompt +
        'Answer less than 1000 characters.';
    const params = {
        prompt: modifiedPrompt,
        model: 'text-davinci-003',
        max_tokens: 2048,
        temperature: 0,
    };

    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

    const client = axios.create({
        headers: {
            Authorization: 'Bearer ' + apiKey,
        },
    });

    try {
        const result = await client.post(
            'https://api.openai.com/v1/completions',
            params
        );
        console.log(result.data.choices[0].text);
        return result.data.choices[0].text;
    } catch (err) {
        console.log(err);
        return 'Error';
    }
};
