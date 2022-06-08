<template>
  <div class="staff">
    <h1>Создание обращения в техническую поддержку</h1>
    <hr />
    <v-form class="staff-form" v-model="valid">
      <v-row>
        <v-col>
          <v-text-field
            v-model="appeal.name"
            class="staff-form__name"
            label="ФИО*"
            placeholder="Введите свое ФИО"
            variant="outlined"
            :rules="[rules.required]"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="appeal.cab"
            class="staff-form__cab"
            label="Кабинет*"
            placeholder="Введите номер кабинета"
            variant="outlined"
            :rules="[rules.required]"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea
            v-model="appeal.text"
            class="staff-form__text"
            label="Обращение*"
            placeholder="Введите текст обращения"
            variant="outlined"
            :rules="[rules.required, rules.max]"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="staff-form__button">
            <v-btn :disabled="!valid" @click="sendAppeal(sendAppeal)">Отправить</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      valid: false,
      rules: {
        required: (value) => !!value || "Данное окно должно быть заполнено.",
        max: (value) =>
          value.length <= 150 || "Обращение должно быть не более 150 символов.",
      },
      appeal: {
        id: Date.now(),
        name: ' ',
        cab: ' ',
        text: ' ',
      },
    };
  },

  methods: {
    ...mapActions({
      getAppeal: 'Appeals/getAppeal',
    }),

    sendAppeal() {
      const { id, name, cab, text } = this.appeal;
      this.getAppeal({ id, name, cab, text });
      this.appeal= {
        id: Date.now(),
        name: '',
        cab: '',
        text: '', 
      };
    },
  },
};
</script>

<style lang="scss">
.staff {
  width: 800px;
  padding: 50px 0;
  text-align: center;
  margin: 0 auto;

  .staff-form {
    margin-top: 30px;
    text-align: left;

    &__name,
    &__cab {
      height: 80px;
    }

    &__text {
      height: 180px;
    }

    &__button {
      text-align: right;
    }
  }
}
</style>