<template>
  <div>
    <div class="modal-header">
      <a-row>
        <a-col :span="12">
          <span class="title-content">{{ l('AbpGdpr.texts.PersonalData') }}</span>
        </a-col>
        <a-col :span="12" style="text-align: right">
          <a-space>
            <a-button :disabled="!isRequestAllowed" :type="'primary'" @click="requestPersonalData()">
              {{ l('AbpGdpr.texts.RequestPersonalData') }}
            </a-button>
            <a-button :type="'primary'" @click="deletePersonalDataPopup()" danger>
              {{ l('AbpGdpr.texts.DeletePersonalData') }}
            </a-button>
          </a-space>
        </a-col>
        <a-col :span="24">
          <div class="alert alert-danger">
            <div> {{ l('AbpGdpr.texts.PersonalDataDescription') }}</div>
          </div>
        </a-col>
      </a-row>
    </div>

    <f-dynamic-table ref="table" type="personalData" :fetch="fetchDataList" :showToolbar="false" :showFilter="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'actions'">
          <div v-if="new Date(record.readyTime) > new Date()">
            <a-button type="primary"  :disabled="true">
              {{ l('AbpGdpr.texts.Preparing')  }}
            </a-button>
            <!-- <a-tag :color="'#ff9f38'">{{ }}</a-tag> -->
          </div>
          <div v-else>
            <a-button :type="'primary'" @click="download(record.id)">
              {{ l('AbpGdpr.texts.Download') }}
            </a-button>
            <!-- <a-tag :color="'#4fbf67'">{{ l('AbpGdpr.texts.PersonalData:Accomplish') }}</a-tag> -->
          </div>
        </template>
      </template>
    </f-dynamic-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import personalDataMixin from './personalData';

export default defineComponent({
  name: 'personalData',
  mixins: [personalDataMixin],
});
</script>
<style lang="less" scoped>
.modal-header {
  margin-top: 20px;
  margin-right: 8px;
  margin-left: 8px;
}

.title-content {
  font-size: 1.5em !important;
  font-weight: 600;
}

.alert-danger {
  position: relative;
  border: 1px solid rgb(67 138 167 / 30%);
  background: #438aa74d;
  color: #325168;
  backdrop-filter: saturate(100%) blur(10px);
}

.alert {
  --bs-alert-padding-x: 1.5rem;
  --bs-alert-padding-y: 1.5rem;
  --bs-alert-margin-bottom: 1rem;
  --bs-alert-border-radius: 0.5rem;

  margin-top: 20px;
  margin-bottom: var(--bs-alert-margin-bottom);
  padding: var(--bs-alert-padding-y) var(--bs-alert-padding-x);
  border-radius: var(--bs-alert-border-radius);
}

html[data-theme='dark'] {
  .alert-danger {
    color: #f9fafc;
  }
}
</style>
