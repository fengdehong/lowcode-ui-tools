export const formConf = {
    version: '1.0',
    formModel: 'form',
    rules: 'rules',
    size: 'medium',
    labelPosition: 'right',
    labelWidth: 80,
    gutter: 15,
};

export function newFormConfig() {
    return {
        config: Object.assign({}, formConf),
        list: []
    }
}
