import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-cyan-200 p-6">
      <div class="bg-white rounded-2xl shadow-xl p-10 max-w-xl w-full text-center">
        <h1 class="text-5xl font-bold mb-4 text-cyan-600">404 – Page Not Found</h1>
        <p class="text-lg text-gray-600 mb-6">
          Oops! The page you’re looking for doesn’t exist. It might have been moved or deleted.<br />
          Please check the URL or return to the homepage.
        </p>
        <a
          class="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300"
          routerLink="/"
        >
          Back to Homepage
        </a>
      </div>
    </div>
  `,

  standalone: true,
})
export class NotFoundPageComponent {}
