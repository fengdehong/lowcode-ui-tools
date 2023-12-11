/**
 *
 * @param config {Object}
 * @param controllers {*[]}
 */
export function jsonConfigDeserialize(config, controllers) {
    for (let key of Object.keys(config)) {
        let subConfig = config[key];
        if (!subConfig) {
            continue;
        }
        config[key] = controllerDeserialize(subConfig, controllers);
        if (typeof subConfig === 'object') {
            jsonConfigDeserialize(subConfig, controllers);
        }
    }
}

/**
 *
 * @param config {Object}
 */
export function jsonConfigFormFields(config) {
    const result = [];

    function findSub(item) {
        for (let key of Object.keys(item)) {
            let subConfig = item[key];
            if (!subConfig) {
                continue;
            }
            if (subConfig.compType && subConfig.formItemConfig) {
                result.push(subConfig.formItemConfig);
            }
            if (typeof subConfig === 'object') {
                findSub(subConfig);
            }
        }
    }

    findSub(config);
    return result;

}

function controllerDeserialize(config, controllers) {
    if (config.compType) {
        let controller = controllers.find(c => c._compType === config.compType);
        let newInstance = new controller();
        return Object.assign(newInstance, config);
    } else {
        return config;
    }
}
