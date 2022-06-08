<template>
  <div class="main">
    <h1>Список обращений в техническую поддержку</h1>
    <hr />
    <div class="filter">
      <h2>Сортировка</h2>
      <div class="filter-complete">
        <v-autocomplete
          v-model="selectedSort"
          :items="sort"
          dense
          filled
          label="Выберите сортировку..."
        />
        <v-btn @click="clearFilter">Очистить сортировку</v-btn>
      </div>
    </div>
    <div class="admin" v-if="items.length">
      <v-table density="compact">
        <thead>
          <tr>
            <th class="text-center">№</th>
            <th class="text-center">ФИО</th>
            <th class="text-center">Обращение</th>
            <th class="text-center">Выбор отдела</th>
            <th class="text-center">Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(appeal, idx) of items" :key="idx">
            <td class="text-center">{{ idx + 1 }}</td>
            <td class="text-center">{{ appeal.name }}</td>
            <td class="text text-center">{{ appeal.text }}</td>
            <td class="text-center">
              <Modal @department="this.department = $event" />
            </td>
            <td class="text-center">
              <v-btn @click="redirectAppeal(appeal)">Отправить</v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <div v-else><p>Пока что список обращений пуст.</p></div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import Modal from "./components/Modal.vue";

export default {
  name: "Admin",
  components: { Modal },
  data() {
    return {
      selectedSort: null,
      sort: ["По ФИО", "По обращению"],
      department: "",
    };
  },

  methods: {
    ...mapActions({
      appeals: "Appeals/appeals",
      getTranslatedAppeals: "TranslatedAppeals/getAppeals",
    }),

    ...mapMutations({
      selectSort: "Appeals/selectSort",
      updateAppeals: "Appeals/updateAppeals",
    }),

    clearFilter() {
      this.selectedSort = null;
      this.selectSort(this.selectedSort);
    },

    redirectAppeal(appeal) {
      if (!this.department) {
        return alert('Для начала вы должны выбрать отдел!')
      }

      const translatedAppeal = { ...appeal, department: this.department };
      this.getTranslatedAppeals(translatedAppeal);
      this.updateAppeals(appeal);

      this.department = "";
    },
  },

  watch: {
    selectedSort(value) {
      this.selectSort(value);
    },
  },

  computed: {
    ...mapGetters({
      items: "Appeals/appeals",
      filters: "Appeals/getFilter",
    }),
  },
};
</script>

<style lang="scss" scoped>
.main {
  margin: 50px auto;

  h1 {
    text-align: center;
  }

  .filter {
    margin: 20px auto;

    h2 {
      margin-bottom: 5px;
    }

    &-complete {
      display: flex;
      justify-content: center;

      button {
        margin-left: 10px;
        height: 56px;
      }
    }
  }

  .admin {
    border: 2px solid #1b1b1b;
    border-radius: 10px;
    box-shadow: 0 0 9px gray;

    th {
      text-align: center;
    }

    td {
      button {
        height: 20px;
      }
    }

    .text {
      max-width: 400px;
    }
  }
}
</style>