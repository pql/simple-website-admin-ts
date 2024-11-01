import { Server } from '@xeokit/xeokit-bim-viewer';
import httpClient from '/@/utils/http-client';
import { BuildingFloorModelService } from '@/apis';
import { APP_DARK_MODE_KEY } from '@/enums/cacheEnum';

export class BIMServer extends Server {
  _dataDir: any;
  constructor(cfg: any = {}) {
    super(cfg);
    this._dataDir = cfg.dataDir || '';
  }

  /**
   * Gets information on all available projects.
   *
   * @param {Function} done Callback through which the JSON result is returned.
   * @param {Function} error Callback through which an error message is returned on error.
   */
  getProjects(done, error) {
    BuildingFloorModelService.getApiAppBuildingFloorModelProjects()
      .then((res) => {
        if (typeof res === 'object') {
          done(res);
          return;
        }
        try {
          done(JSON.parse(res));
        } catch (e) {
          error(`utils.loadJSON(): Failed to parse JSON response - ${e}`);
        }
      })
      .catch((err) => {
        error(err);
      });
  }

  /**
   * Gets information for a project.
   *
   * @param {String} projectId ID of the project.
   * @param {Function} done Callback through which the JSON result is returned.
   * @param {Function} error Callback through which an error message is returned on error.
   */
  getProject(projectId, done, error) {
    const url = `${this._dataDir}/projects/${projectId}/index.json`;
    this.loadJSON(url, done, error);
  }

  /**
   * Gets metadata for a model within a project.
   *
   * @param {String} projectId ID of the project.
   * @param {String} modelId ID of the model.
   * @param {Function} done Callback through which the JSON result is returned.
   * @param {Function} error Callback through which an error message is returned on error.
   */
  getMetadata(projectId, modelId, done, error) {
    const url = `${this._dataDir}/projects/${projectId}/models/${modelId}/index.json`;
    this.loadJSON(url, done, error);
  }

  /**
   * Gets geometry for a model within a project.
   *
   * @param {String} projectId ID of the project.
   * @param {String} modelId ID of the model.
   * @param {Function} done Callback through which the JSON result is returned.
   * @param {Function} error Callback through which an error message is returned on error.
   */
  getGeometry(projectId, modelId, done, error) {
    // const url = this._dataDir + '/projects/' + projectId + '/models/' + modelId + '/geometry.xkt';
    // this.loadArraybuffer(url, done, error);
    super.getGeometry(projectId, modelId, done, error);
  }

  /**
   * Gets metadata for an object within a model within a project.
   *
   * @param {String} projectId ID of the project.
   * @param {String} modelId ID of the model.
   * @param {String} objectId ID of the object.
   * @param {Function} done Callback through which the JSON result is returned.
   * @param {Function} error Callback through which an error message is returned on error.
   */
  getObjectInfo(projectId, modelId, objectId, done, error) {
    const url = `${this._dataDir}/projects/${projectId}/models/${modelId}/props/${objectId}/index.json`;
    this.loadJSON(url, done, error);
  }

  /**
   * Gets existing issues for a model within a project.
   *
   * @param {String} projectId ID of the project.
   * @param {String} modelId ID of the model.
   * @param {Function} done Callback through which the JSON result is returned.
   * @param {Function} error Callback through which an error message is returned on error.
   */
  getIssues(projectId, modelId, done, error) {
    const url = `${this._dataDir}/projects/${projectId}/models/${modelId}/issues.json`;
    this.loadJSON(url, done, error);
  }
  setviewerConfigs(data) {
    const backColor = {
      dark: ['0.09', '0.09', '0.102'],
      light: ['0.973', '0.976', '0.98'],
    };
    const theme = localStorage.getItem(APP_DARK_MODE_KEY) || 'dark';

    if (data.viewerConfigs) {
      data.viewerConfigs = {
        backgroundColor: backColor[theme],
      };
    }
    return data;
  }
  loadJSON(url: string, ok: (e) => void, err: (e) => void) {
    const defaultCallback = (_value) => undefined;
    ok = ok || defaultCallback;
    err = err || defaultCallback;
    httpClient
      .get(url, {
        responseType: 'json',
      })
      .then((res) => {
        if (typeof res.data === 'object') {
          console.log(' res.data', res.data);
          const data = this.setviewerConfigs(res.data);
          ok(data);
          return;
        } else {
          try {
            console.log('JSON.parse(res.data)', JSON.parse(res.data));
            const data = this.setviewerConfigs(JSON.parse(res.data));
            ok(data);
          } catch (e) {
            err(`utils.loadJSON(): Failed to parse JSON response - ${e}`);
          }
        }
      })
      .catch((error) => {
        err(error);
      });
  }
}
