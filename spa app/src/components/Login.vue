<template>
  <div class="login">
    <h1 class="login-head">Авторизация</h1>
    <hr />
    <v-form class="login-form" v-model="valid">
      <v-row>
        <v-col>
          <v-text-field
            v-model="token.login"
            class="login-form__login"
            label="Логин*"
            placeholder="Введите свой логин"
            variant="outlined"
            :rules="[rules.required]"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="token.password"
            class="login-form__password"
            label="Пароль*"
            placeholder="Введите свой пароль"
            variant="outlined"
            type="password"
            :rules="[rules.required, rules.min]"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn class="login-form__button" :disabled="!valid" @click="getToken(this.token)">
            <router-link :to="$router.push(`/${hasToken ? hasToken : ''}`)">Войти</router-link>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <div class="hasntUser" v-if="incorrectData">
      <p>Введен неправильный логин или пароль. Проверьте корректность ввода.</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    valid: false,
    show: false,
    rules: {
      required: (value) => !!value || "Данное окно должно быть заполнено.",
      min: (value) =>
        value.length >= 8 || "Пароль должен состоять минимум из 8 символов",
    },
    token: {
      login: "",
      password: "",
    },
  }),

  methods: {
    ...mapActions({
      getToken: 'getToken',
    }),
  },

  computed: {
    ...mapGetters({
      hasToken: 'hasToken',
      incorrectData: 'incorrectData',
    }),
  },
};
</script>

<style lang="scss">
.login {
  border: 2px solid #1b1b1b;
  border-radius: 10px;
  padding: 0 30px 20px;
  width: 500px;
  margin: 50px auto;
  box-shadow: 0 0 9px gray;

  .login-head {
    text-align: center;
    margin: 10px auto;
    font-weight: 400;
  }

  .login-form {
    width: 300px;
    margin: 20px auto;

    &__login {
      height: 60px;
      width: 300px;
    }

    &__password {
      margin-top: 20px;
      height: 60px;
      width: 300px;
    }

    &__button {
      margin-top: 20px;
      margin-left: 100px;

      &:disabled {
        a {
          color: lightgray;
        }
      }

      a {
        text-transform: uppercase;
        text-decoration: none;
        color: #1b1b1b;
      }
    }
  }

  .hasntUser {
    margin-top: 30px;
    border: 3px solid red;
    border-radius: 10px;

    p {
      padding: 10px;
      text-align: center;
      font-weight: 600;
    }
  }
}
</style>