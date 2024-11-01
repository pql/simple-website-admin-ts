<template>
  <div>
    <f-btn
      :icon="icon"
      :text="text"
      :disable="disable"
      :eventName="'Import'"
      @callback="callback($event)"
      :classes="[className, 'flex-center']"
    />
    <a-modal
      class="excel-import"
      width="600px"
      :open="isVisible"
      :title="l('Unified.texts.ImportFromExcel')"
      :maskClosable="false"
      cancelText="null"
      okText="null"
      :centered="true"
      :closable="true"
      @cancel="handleCancel"
    >
      <template v-if="showType === 'button'">
        <a-upload
          :action="importExcelUrl"
          accept="xls/*"
          withCredentials="false"
          headers="uploadHeaders"
          @change="handleChange($event)"
        >
          <a-button><i a-icon nzType="upload"></i> {{ l(buttonTest) }}</a-button>
        </a-upload>
      </template>
      <!-- 更新日志：2021/9/2 把[nzMultiple] 更新为false，禁止选择多个文件-->
      <template v-else>
        <a-upload
          type="drag"
          :action="importExcelUrl"
          accept=".xls,.xlsx"
          :withCredentials="false"
          :multiple="false"
          :maxCount="maxCount"
          :headers="uploadHeaders"
          :customRequest="handleCustomRequest"
          v-model:fileList="fileList"
        >
          <template #itemRender="{ file }">
            <a-card :bodyStyle="{ padding: '5px 10px' }">
              <div class="fileDiyList">
                <div class="left">
                  <svg class="icon yo-icon-icons" aria-hidden="true">
                    <use xlink:href="#yo-icon-wenjian" />
                  </svg>
                  <p>{{ file.name }}</p>
                </div>
                <div class="right">
                  <div class="SorE">
                    <div
                      class="t"
                      v-if="
                        (file.status === 'done' || file.status === 'success') &&
                        file?.error &&
                        !file?.error?.hasError
                      "
                    >
                      <svg class="icon yo-icon-icons" aria-hidden="true">
                        <use xlink:href="#yo-icon-chenggong" />
                      </svg>
                    </div>

                    <div
                      class="f"
                      v-if="
                        (file.status === 'done' || file.status === 'success') &&
                        file?.error &&
                        file?.error?.hasError
                      "
                    >
                      <p v-if="file?.error?.labelingErrorFileDto" @click="downError(file)">
                        {{ l('DowloadErrorLabels') }}
                      </p>
                      <a-tooltip
                        class="detail"
                        trigger="'click'"
                        :overlayStyle="{ borderRadius: '6px' }"
                        overlayClassName="tipCardFile"
                      >
                        <template #title>
                          <!-- <p>{{ item.error | handleData }}</p> -->
                          <div class="boxTip">
                            <div
                              class="item"
                              v-for="(err, idx) in transform(file.error)"
                              :key="idx"
                            >
                              <p>{{ err?.title }}</p>
                              <p v-for="(child, index) in err.content" :key="index">
                                <span>{{ child.key }}</span>
                                <span>：</span>
                                <span>{{ child.value }}</span>
                              </p>
                            </div>
                          </div>
                          <!-- <ng-container *ngFor="let data of item.error.templateErrors">
                                <a-alert
                                  nzType="warning"
                                  nzShowIcon
                                  nzCloseable
                                  [nzMessage]="data.message + '字段为：' + data.requireColumnName"
                                >
                                </a-alert>
                              </ng-container>
    
                              <ng-container *ngFor="let data of item.error.rowErrors">
                                <a-alert
                                  nzType="warning"
                                  nzShowIcon
                                  nzCloseable
                                  [nzMessage]="'第' + data.rowIndex + '行'"
                                  [nzDescription]="fieldErrorsShow"
                                >
                                </a-alert>
    
                                <ng-template #fieldErrorsShow>
                                  <pre>{{ data.fieldErrors | importError }}</pre>
                                </ng-template>
                              </ng-container> -->
                        </template>
                        <!-- <i class="yo-icon-icons yo-icon-chakanyanjing"> </i> -->
                        <svg class="icon yo-icon-icons" aria-hidden="true">
                          <use xlink:href="#yo-icon-chakanyanjing" />
                        </svg>
                        <span>{{ l('ErrorDetails') }}</span>
                      </a-tooltip>
                    </div>
                  </div>
                  <div>
                    <a-button
                      v-if="errorFileData && !errorFileData['isSuccess']"
                      type="link"
                      @click="downErrorFile"
                      >{{ l('Unified.texts.Failedfiledownload') }}</a-button
                    >
                  </div>
                  <div class="active">
                    <svg @click="deleteItem(file)" class="icon yo-icon-icons" aria-hidden="true">
                      <use xlink:href="#yo-icon-shanchu3" />
                    </svg>
                  </div>
                </div>
              </div>
            </a-card>
          </template>
          <p class="ant-upload-drag-icon">
            <svg v-if="icon" class="icon yo-icon-icons upload-style icon-1" aria-hidden="true">
              <use xlink:href="#yo-icon-shangchuan1" />
            </svg>
          </p>
          <p class="ant-upload-text">{{ l('ClickAreaToUploadFiles') }}</p>
        </a-upload>
      </template>
      <template #footer>
        <a-button key="close" @click="handleCancel">{{ l('Unified.texts.Close') }}</a-button>
        <a-button key="downLoad" :loading="templateLoading" @click="handleDownLoadTem">{{
          l('Unified.texts.Import:DownTemplate')
        }}</a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          :disabled="!fileList.length || saveDisabled"
          @click="submit"
          >{{ l('Unified.texts.Import:Submit') }}</a-button
        >
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ExcelImport from './f-excel-import';

  export default defineComponent({
    name: 'FExcelImport',
    mixins: [ExcelImport],
  });
</script>

<style lang="less" scoped>
  @import './f-excel-import.less';
</style>
