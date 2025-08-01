import type { Actions } from './$types';

export const actions = {
	default: async (event) => {
		// TODO log the user in
		const data = await event.request.formData();

    const discordWebhook = "https://discord.com/api/webhooks/1400687115918119055/jAJtA6dU9q1xfJw1szCkQLeo2cy_sm9HjhKv7DpViOlIyHeauSOvRZ8WBqtUaxhSgJO3"

    const response = await fetch(discordWebhook, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				content: `New website submitted: ${data.get('url')}`,
				embeds: [
					{
						title: 'New Website Submitted',
						description: `A new website has been submitted: ${data.get('url')}`,
						color: 0x00ff00,
						timestamp: new Date().toISOString()
					}
				]
			})
		});
		console.log(response.body);
    return { success: true };
	}
} satisfies Actions;