<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isMenuOpen = ref(false)
const mobileMenuRef = ref<HTMLElement | null>(null)
const mobileMenuButtonRef = ref<HTMLElement | null>(null)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// Improve menu close handling
const closeMenu = (event: MouseEvent) => {
  const target = event.target as HTMLElement

  // Check if click was in menu or button
  const isClickInsideMenu = mobileMenuRef.value?.contains(target)
  const isClickOnButton = mobileMenuButtonRef.value?.contains(target)

  // If click was outside menu and button, close menu
  if (!isClickInsideMenu && !isClickOnButton) {
    isMenuOpen.value = false
  }
}

// Handle Escape key
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isMenuOpen.value) {
    isMenuOpen.value = false
  }
}

// Handle link clicks
const handleLinkClick = () => {
  isMenuOpen.value = false
}

// Add and remove event listeners
onMounted(() => {
  document.addEventListener('click', closeMenu)
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('click', closeMenu)
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <nav
    class="bg-zinc-900/80 backdrop-blur border-b border-zinc-800 shadow-sm sticky top-0 z-[100] transition-all"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center w-full">
        <!-- Logo a la izquierda -->
        <router-link to="/" class="flex items-center gap-2 group select-none h-16">
          <img
            src="/bindinLogo.webp"
            alt="Bindin Logo"
            class="w-9 h-9 object-contain rounded-full shadow-md group-hover:scale-105 transition-transform duration-200"
          />
          <span
            class="text-2xl font-bold text-zinc-100 tracking-tight group-hover:text-indigo-400 transition-colors duration-200 flex items-center h-full"
            >Bindin</span
          >
        </router-link>
        <!-- Opciones centradas SOLO en sm+ -->
        <div class="absolute left-1/2 top-0 h-16 items-center -translate-x-1/2 hidden sm:flex">
          <div class="flex items-center gap-2">
            <router-link
              to="/polls"
              class="px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 relative group"
              :class="
                route.path.startsWith('/polls')
                  ? 'bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-md scale-105'
                  : 'text-zinc-200 hover:bg-zinc-800 hover:text-indigo-400'
              "
            >
              <span>Polls</span>
              <span
                class="absolute left-4 right-4 -bottom-1 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
              />
            </router-link>
            <router-link
              to="/forms"
              class="px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 relative group"
              :class="
                route.path.startsWith('/forms')
                  ? 'bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-md scale-105'
                  : 'text-zinc-200 hover:bg-zinc-800 hover:text-indigo-400'
              "
            >
              <span>Forms</span>
              <span
                class="absolute left-4 right-4 -bottom-1 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
              />
            </router-link>
          </div>
        </div>
        <!-- Mobile menu button SOLO en mobile -->
        <div class="sm:hidden flex items-center">
          <button
            ref="mobileMenuButtonRef"
            type="button"
            class="mobile-menu-button inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-indigo-400 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
            @click.stop="toggleMenu"
            :aria-expanded="isMenuOpen"
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <span class="sr-only">Open menu</span>
            <svg
              class="h-7 w-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                v-if="isMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Mover el menú móvil fuera del nav usando Teleport -->
  <Teleport to="body">
    <!-- Overlay para fondo oscuro -->
    <transition name="fade">
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm sm:hidden z-[200]"
        @click.stop="isMenuOpen = false"
      />
    </transition>

    <!-- Mobile menu -->
    <transition name="slide-right">
      <div
        v-if="isMenuOpen"
        ref="mobileMenuRef"
        id="mobile-menu"
        class="mobile-menu sm:hidden fixed right-0 top-0 h-full w-72 bg-zinc-900/95 backdrop-blur border-l border-zinc-800 shadow-xl px-4 py-6 z-[250] overflow-y-auto"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="mobile-menu-button"
        @click.stop
      >
        <!-- Header del menú -->
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-2">
            <img
              src="/bindinLogo.webp"
              alt="Bindin Logo"
              class="w-8 h-8 object-contain rounded-full shadow-md"
            />
            <h2 class="text-xl font-bold text-zinc-100">Menú</h2>
          </div>
          <button
            type="button"
            class="p-2 rounded-md text-zinc-400 hover:text-indigo-400 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
            @click.stop="isMenuOpen = false"
            aria-label="Close menu"
          >
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Separador -->
        <div class="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent mb-6"></div>

        <!-- Enlaces del menú -->
        <div class="space-y-3">
          <router-link
            to="/polls"
            class="block w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 relative group"
            :class="
              route.path.startsWith('/polls')
                ? 'bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-md scale-105'
                : 'text-zinc-200 hover:bg-zinc-800 hover:text-indigo-400'
            "
            @click.stop="handleLinkClick"
          >
            <div class="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <span>Polls</span>
            </div>
            <span
              class="absolute left-4 right-4 -bottom-1 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
            />
          </router-link>
          <router-link
            to="/forms"
            class="block w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 relative group"
            :class="
              route.path.startsWith('/forms')
                ? 'bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-md scale-105'
                : 'text-zinc-200 hover:bg-zinc-800 hover:text-indigo-400'
            "
            @click.stop="handleLinkClick"
          >
            <div class="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Forms</span>
            </div>
            <span
              class="absolute left-4 right-4 -bottom-1 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
            />
          </router-link>
        </div>

        <!-- Separador -->
        <div class="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent my-6"></div>

        <!-- Footer del menú -->
        <div class="text-center text-sm text-zinc-500">
          <p>Bindin © 2025</p>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: right;
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Asegurar que el menú móvil tenga scroll si es necesario */
@media (max-height: 600px) {
  .mobile-menu {
    overflow-y: auto;
  }
}

/* Asegurar que el menú móvil siempre esté por encima */
.mobile-menu {
  position: fixed;
  z-index: 250;
}

/* Asegurar que el overlay siempre esté por encima del contenido pero debajo del menú */
.fade-enter-active,
.fade-leave-active {
  position: fixed;
  z-index: 200;
}
</style>
