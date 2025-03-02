<script>
  import { Button } from "flowbite-svelte";
</script>

<main
  class="flex flex-col items-center p-6 space-y-10 max-w-5xl mx-auto bg-primary-100 dark:bg-gray-800 rounded-2xl mt-5 mb-5"
>
  <section class="text-center py-20">
    <h1 class="text-5xl font-bold text-gray-900 dark:text-gray-100">
      Добро пожаловать в наш образовательный центр
    </h1>
    <p class="mt-4 text-lg  text-gray-800 dark:text-gray-100">
      Развивайте свои навыки с лучшими преподавателями и уникальными курсами.
    </p>
  </section>

  <section class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
    <div class="p-6 rounded-lg dark:text-gray-100 dark:bg-gray-700">
      <h2 class="text-2xl font-semibold">Экспертные преподаватели</h2>
      <p class="mt-2  text-gray-800 dark:text-gray-300">
        Наши курсы ведут профессионалы с многолетним опытом.
      </p>
    </div>
    <div class="p-6 rounded-lg dark:text-gray-100 dark:bg-gray-700">
      <h2 class="text-2xl font-semibold">Современные методики</h2>
      <p class="mt-2  text-gray-800 dark:text-gray-300">
        Используем новейшие технологии и интерактивные методы обучения.
      </p>
    </div>
    <div class="p-6 rounded-lg dark:text-gray-100 dark:bg-gray-700">
      <h2 class="text-2xl font-semibold">Гибкий график</h2>
      <p class="mt-2  text-gray-800 dark:text-gray-300">
        Учитесь в удобное время и в удобном формате.
      </p>
    </div>
  </section>

  <section class="text-center py-10">
    <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
      Отзывы студентов
    </h2>
    <p class="mt-4  text-gray-800 dark:text-gray-300">
      Тысячи студентов уже прошли наши курсы и достигли успеха.
    </p>
    <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="p-6 bg-white dark:bg-gray-700 rounded-lg">
        <p class="text-gray-800 dark:text-gray-50">
          «Этот курс изменил мою карьеру! Отличные материалы и преподаватели.»
        </p>
        <p class="mt-2 font-semibold text-gray-800 dark:text-gray-50">
          — Алексей Иванов
        </p>
      </div>
      <div class="p-6 bg-white dark:bg-gray-700 rounded-lg">
        <p class="text-gray-800 dark:text-gray-50">
          «Очень удобная платформа и доступ к курсам в любое время.»
        </p>
        <p class="mt-2 font-semibold text-gray-800 dark:text-gray-50">
          — Мария Смирнова
        </p>
      </div>
    </div>
  </section>
</main>
