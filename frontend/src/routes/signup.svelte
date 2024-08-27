<script lang="ts">
  import { z } from "zod";
  import { type FormSchema, formSchema } from "../schemas/signup.schema";

  let errors: Partial<FormSchema> = {};

  let userData = {
    name: "",
    age: 18,
    geneder: "male",
    email: "",
    password: "",
  };

  const handleSubmit = () => {
    try {
      formSchema.parse(userData);
      errors = {};
    } catch (err) {
      if (err instanceof z.ZodError) {
        errors = err.formErrors.fieldErrors as Partial<FormSchema>;
        setTimeout(() => {
          errors = {};
        }, 2000);
      }
    }
  };
</script>

<div
  style="background: #ff70ae; background-image: radial-gradient(at 47% 33%, #9149fd 0, transparent 59%), radial-gradient(at 82% 65%, #f9cd2f 0, transparent 55%);"
  class="grid h-screen place-items-center rounded-md p-8 font-sans text-white bg-cover"
>
  <div class="flex flex-col gap-y-6 bg-white p-4 rounded-xl shadow-md">
    <div class="text-center py-10">
      <h1 class="lilita-one-regular text-7xl text-pink-400">Datting app</h1>
      <h2 class="lilita-one-regular text-1xl text-pink-400">
        Find your perfect match
      </h2>
    </div>
      <form class="flex flex-col gap-2" action="" on:submit|preventDefault={handleSubmit}>
        <input
          bind:value={userData.name}
          class="border-2 pl-2 py-2 text-pink-400 w-full"
          type="text"
          name=""
          id=""
          placeholder="Name"
        />

        {#if errors.name}
          <p class="text-red-500">{errors.name}</p>
        {/if}

        <input
          bind:value={userData.age}
          class="border-2 pl-2 py-2 text-pink-400 w-full"
          type="number"
          min="18"
          name=""
          id=""
          placeholder="+18"
        />

        {#if errors.age}
          <p class="text-red-500">{errors.age}</p>
        {/if}

        <select
          bind:value={userData.geneder}
          class="border-2 pl-2 py-2 text-pink-400 w-full"
          name=""
          id=""
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        {#if errors.geneder}
          <p class="text-red-500">{errors.geneder}</p>
        {/if}

        <input
          bind:value={userData.email}
          class="border-2 pl-2 py-2 text-pink-400 w-full"
          type="text"
          name=""
          id=""
          placeholder="Email"
        />

        {#if errors.email}
          <p class="text-red-500">{errors.email}</p>
        {/if}

        <input
          bind:value={userData.password}
          class="border-2 pl-2 py-2 text-pink-400 w-full"
          type="text"
          name=""
          id=""
          placeholder="password"
        />

        {#if errors.password}
          <p class="text-red-500">{errors.password}</p>
        {/if}
      </form>
    <div>
      <button
        on:click={handleSubmit}
        class="text-pink-400 w-full lilita-one-regular text-xl border-2 py-2 hover:bg-[#ff70ae] hover:text-white transition-all"
      >
        Sign Up
      </button>
    </div>
  </div>
</div>
