<template>
  <div>
    <img class="mx-auto h-8 w-auto" src="../assets/Logo.png" alt="S letter logo" />
    <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
      Register for free
    </h2>
    <p class="mt-2 text-center text-sm text-gray-600">
      Or
      {{ " " }}
      <router-link
        :to="{ name: 'Login' }"
        class="font-medium text-indigo-600 hover:text-indigo-500"
      >
        login to your account
      </router-link>
    </p>
  </div>

  <form class="mt-8 space-y-6" @submit="register">
    <Alert v-if="error">
      {{ error }}
      <span
        @click="error = ''"
        class="w-8 h-8 cursor-pointer flex items-center justify-center rounded-full transition-colors hover:bg-[rgba(0,0,0,0.2)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
    </Alert>

    <input type="hidden" name="remember" value="true" />
    <div class="-space-y-px rounded-md shadow-sm">
      <div>
        <label for="fullname" class="sr-only">Full name</label>
        <input
          id="fullname"
          name="fullname"
          type="text"
          autocomplete="name"
          required
          class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          placeholder="Full name"
          v-model="user.name"
        />
      </div>
      <div>
        <label for="email-address" class="sr-only">Email address</label>
        <input
          id="email-address"
          name="email"
          type="email"
          autocomplete="email"
          required
          class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          placeholder="Email address"
          v-model="user.email"
        />
      </div>
      <div>
        <label for="password" class="sr-only">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autocomplete=""
          required
          class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          placeholder="Password"
          v-model="user.password"
        />
      </div>
      <div>
        <label for="password-confirmation" class="sr-only">Password Confirmation</label>
        <input
          id="password-confirmation"
          name="password-confirmation"
          type="password"
          autocomplete=""
          required
          class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          placeholder="Password Confirmation"
          v-model="user.password_confirmation"
        />
      </div>
    </div>
    <div class="p-3 rounded" v-if="passwordValidationShow">
      <h2 class="text-black text-xl">Password must contain:</h2>
      <ul v-for="passValid in passwordValidation" class="flex gap-2">
        <svg
          v-if="passValid.status"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
        <svg
          v-if="!passValid.status"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>

        <li
          :class="[passValid.status ? 'text-green-600' : 'text-red-600']"
          class="text-bold"
        >
          {{ passValid.message }}
        </li>
      </ul>
    </div>
    <div>
      <button
        :disabled="loading"
        type="submit"
        class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        :class="{ 'cursor-not-allowed': loading, 'hover:bg-indigo-500': loading }"
      >
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <LockClosedIcon
            class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
            aria-hidden="true"
          />
        </span>
        <svg
          v-if="loading"
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Sign up
      </button>
    </div>
  </form>
</template>

<script setup>
import { LockClosedIcon } from "@heroicons/vue/20/solid";
import store from "../store";
import { useRouter } from "vue-router";
import { reactive, ref, watch } from "vue";
import Alert from "../components/Alert.vue";

const router = useRouter();

const user = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});
const passwordValidationShow = ref(false);
const passwordValidationShowP = ref(false);
const passwordValidationShowPC = ref(false);

const passwordValidation = reactive({
  lowercase: { status: false, message: "lowercase letters [a-z]" },
  uppercase: { status: false, message: "uppercase letters [A-Z]" },
  digits: { status: false, message: "digits [0-9]" },
  special: {
    status: false,
    message: "special character [! @ # $ % ^ & * ( ) \\ - _ + .]",
  },
  characters: { status: false, message: "at least 8 characters" },
});

const error = ref("");
const loading = ref(false);

function validatePassword(password) {
  if (/(?=(.*[a-z]){1,})/g.test(password)) {
    passwordValidation.lowercase.status = true;
  } else passwordValidation.lowercase.status = false;
  if (/(?=(.*[A-Z]){1,})/g.test(password)) {
    passwordValidation.uppercase.status = true;
  } else passwordValidation.uppercase.status = false;
  if (/(?=(.*[0-9]){1,})/g.test(password)) {
    passwordValidation.digits.status = true;
  } else passwordValidation.digits.status = false;
  if (/(?=(.*[!@#$%^&*()\-_+.]){1,})/g.test(password)) {
    passwordValidation.special.status = true;
  } else passwordValidation.special.status = false;
  if (/.{8,}/g.test(password)) {
    passwordValidation.characters.status = true;
  } else passwordValidation.characters.status = false;
}

watch(user, async (oldValue, newValue) => {
  validatePassword(newValue.password);
});
function strengthValidation() {
  let passwordStrengthValidated = true;
  Object.values(passwordValidation).forEach((valid) => {
    if (valid.status === false) {
      passwordStrengthValidated = false;
    }
  });
  if (!passwordStrengthValidated) {
    passwordValidationShow.value = true;
    passwordValidationShowP.value = true;
    error.value = `Password is too weak `;
  }
  return passwordStrengthValidated;
}

function similarityValidation() {
  if (user.password === user.password_confirmation) {
    return true;
  } else {
    error.value = `Passwords are not similar`;
    return false;
  }
}

function register(event) {
  event.preventDefault();

  if (strengthValidation() && similarityValidation()) {
    loading.value = true;
    store
      .dispatch("register", user)
      .then((res) => {
        loading.value = false;
        router.push({ name: "Dashboard" });
      })
      .catch((err) => {
        loading.value = false;
        error.value = err.response.data.message;
      });
  }
}
</script>
