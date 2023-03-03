import moment from 'moment';

export function getCreatedByUser(params) {
    return (params.row.createdBy.username);
}

export function getAssetName(params) {
    return (params.row.detail[0].assetName);
}

export function getCategory(params) {
    return (params.row.detail[0].category.name);
}

export function getIPAddress(params) {
    return (params.row.detail[0].ipAddress);
}

export function getSerialNumber(params) {
    return (params.row.detail[0].serialNumber);
}

export function getAssignedTo(params) {
    return (params.row.detail[0].assignedTo.username);
}

export function getOwner(params) {
    return (params.row.detail[0].assetOwner.username);
}

export function getLocation(params) {
    return (params.row.detail[0].location);
}

export function getDateCreated(params) {
    return moment(params.row.detail[0].dateCreated).format("MMM Do YYYY, h:mm a");
}

export function getStatus(params) {
    return (params.row.detail[0].status.name);
}

export function getAssetNumber(params) {
    return "AST" + String(params.row.asset_number).padStart(6, '0');
}
