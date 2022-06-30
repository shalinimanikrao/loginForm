import { Injectable } from '@angular/core';
import { datadogLogs } from '@datadog/browser-logs';
import { environment } from '../../../../environments/environment';
import { datadogRum } from '@datadog/browser-rum';
import { AppConfigService } from '../../shared/config/app-config.service';
import { UserDataService } from './userDataservice.service';

const DD_LOGS: any = datadogLogs;

@Injectable({
    providedIn: 'root',
})
export class LoggerService {
    private isLoggingInitialized = false;
    globalContext: any = {};

    constructor(private readonly _config: AppConfigService,
        private readonly _userDataService: UserDataService) {
        this.initialize();
    }

    initialize() {
        if (this._config.getConfig()) {
            this.globalContext = this._userDataService.getLoggingData;
            console.log('glob con' + this.globalContext);
            if (this.globalContext) {
                DD_LOGS.init(this.initializeLoggingParams());
                datadogRum.init(this.initializeRUMMetricsParams());
                datadogRum.setRumGlobalContext(this.globalContext);
                datadogRum.startSessionReplayRecording();
                this.isLoggingInitialized = true;
            }
        }
    }


    initializeLoggingParams() {
        return {
            clientToken: this._config.getConfig().datadog.clientToken,
            applicationId: this._config.getConfig().datadog.applicationId,
            service: this._config.getConfig().datadog.service,
            site: this._config.getConfig().datadog.site,
            env: this._config.getConfig().envName,
            forwardErrorsToLogs: true,
            sampleRate: 100
        };
    }

    initializeRUMMetricsParams() {
        return {
            clientToken: this._config.getConfig().datadog.clientToken,
            applicationId: this._config.getConfig().datadog.applicationId,
            service: this._config.getConfig().datadog.service,
            site: this._config.getConfig().datadog.site,
            env: this._config.getConfig().envName,
            sampleRate: 100
        };
    }


    public debug(message: string, context?: { [x: string]: any }): void {
        if (this.isLoggingInitialized) {
            DD_LOGS.logger.debug(message, this.globalContext);
        }
        else {
            this.initialize();
        }

    }

    public info(message: string, context?: { [x: string]: any }): void {
        if (this.isLoggingInitialized) {
            DD_LOGS.logger.info(message, this.globalContext);
        }
        else {
            this.initialize();
        }
    }

    public warn(message: string, context?: { [x: string]: any }): void {
        if (this.isLoggingInitialized) {
            DD_LOGS.logger.warn(message, this.globalContext);
        }
        else {
            this.initialize();
        }
    }

    public error(message: string, context?: { [x: string]: any }): void {
        if (this.isLoggingInitialized) {
            console.log('datadog logs' + message);
            console.log('Global logs' + this.globalContext);
            DD_LOGS.logger.error(message, this.globalContext);
        }
        else {
            this.initialize();
        }
    }

    public addCustomRUMActions(actionName: string) {
        const customActionName = actionName.indexOf('/search/') > -1 ? actionName.replace('/search/', '') :
            actionName.indexOf('/compensation/') > -1 ? actionName.replace('/compensation/', '') : actionName;
        console.log('custom RUM action' + actionName);
        datadogRum.addAction(customActionName, this.globalContext);
    }
}