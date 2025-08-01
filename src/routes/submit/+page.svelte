<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { enhance } from '$app/forms';

    let url = $state('');
    let isSubmitting = $state(false)
    let submitted = $state<Record<string, boolean>>({
        url: false
    })
    let message = $state<string>('')
    
    
</script>

<svelte:head>
    <title>Submit Your Website - Tossfly</title>
    <meta name="description" content="Submit your SaaS landing page to Tossfly">
    <meta property="og:title" content="Submit Your Website - Tossfly">
    <meta property="og:description" content="Submit your SaaS landing page to Tossfly">
    <meta property="og:image" content="https://tossfly.com/og-image.png">
    <meta property="og:url" content="https://tossfly.com/submit">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
</svelte:head>

<div class="min-h-[80vh] bg-background flex items-center justify-center p-4">
    <div class="w-full max-w-lg space-y-8 bg-card border rounded-2xl p-8 shadow-sm">
        <div class="text-center">
            <h1 class="text-4xl font-bold tracking-tight text-foreground">Submit Your Website</h1>
            <p class="mt-3 text-lg text-muted-foreground">
                Share your website with our community
            </p>
        </div>

        <form method="POST" class="mt-8 space-y-6" action="/submit"
        use:enhance={({ formElement, formData, action, cancel, submitter }) => {
          isSubmitting = true

          if(submitted.url){
            message = 'Website already submitted'
            isSubmitting = false
            return
          }
          return async ({ result, update }) => {
            if(result.type === 'success'){
                setTimeout(() => {
                  submitted = {
                    url: true
                  }
                  message = 'Website submitted successfully'
                  isSubmitting = false
                }, 3000)
            }
           
          };
        }}
        >
            <div class="rounded-lg shadow-sm">
                <div class="relative">
                    <input
                        type="url"
                        required
                        name="url"
                        bind:value={url}
                        placeholder="https://yourwebsite.com"
                        class="block w-full rounded-lg border bg-background px-4 py-3 text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>

            <Button type="submit" size="lg" class="w-full" disabled={isSubmitting}>
                {#if isSubmitting}
                    Submitting...
                {:else}
                    Submit Website
                {/if}
            </Button>

            {#if message}
                <p class="text-sm text-muted-foreground">{message}</p>
            {/if}
        </form>
    </div>
</div>
