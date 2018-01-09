import { JsonProperty } from '../json-mapper/map-utils'; 

export class ProductMetadata {
    id: string;
    @JsonProperty({ name: 'product_id' })
    productId: string;
    name: string;
    value: string|number;
    created: Date;
    modified: Date;

    constructor() {
        this.id = undefined;
        this.name = undefined;
        this.productId = undefined;
        this.value = undefined;
        this.created = undefined;
        this.modified = undefined;
    }
}

export class ProductVersion {
    id: string;
    @JsonProperty({ name: 'product_id' })
    productId: string;
    productVersionMetatadatas: Object;
    @JsonProperty({ name: 'product_version_floatmetadatas', clazz: ProductMetadata })
    productVersionFloatmetadatas: ProductMetadata[];
    @JsonProperty({ name: 'product_version_intmetadatas', clazz: ProductMetadata })
    productVersionIntmetadatas: ProductMetadata[];
    @JsonProperty({ name: 'product_version_txtmetadatas', clazz: ProductMetadata })
    productVersionTxtmetadatas: ProductMetadata[];
    tag: string;
    created: Date;
    modified: Date;

    extractMeta() {
        this.productVersionMetatadatas = {};
        let metaNames = ['productVersionFloatmetadatas', 'productVersionIntmetadatas', 'productVersionTxtmetadatas'];
        metaNames.map(metaName => {
            this[metaName].map(meta => this.productVersionMetatadatas[meta['name']] = meta['value']);
        })
    }

    constructor() {
        this.id = undefined;
        this.productId = undefined;
        this.productVersionMetatadatas = undefined;
        this.productVersionFloatmetadatas = undefined;
        this.productVersionIntmetadatas = undefined;
        this.productVersionTxtmetadatas = undefined;
        this.tag = undefined;
        this.created = undefined;
        this.modified = undefined;
    }
}

export class Product {
    id: string;
    sku: number | string;
    @JsonProperty({ name: 'product_versions', clazz: ProductVersion })
    productVersions: ProductVersion[];
    productMetadatas: Object;
    @JsonProperty({ name: 'product_floatmetadatas', clazz: ProductMetadata })
    productFloatmetadatas: ProductMetadata[];
    @JsonProperty({ name: 'product_intmetadatas', clazz: ProductMetadata })
    productIntmetadatas: ProductMetadata[];
    @JsonProperty({ name: 'product_txtmetadatas', clazz: ProductMetadata })
    productTxtmetadatas: ProductMetadata[];
    @JsonProperty({ name: 'thumb_url' })
    thumbUrl: string;
    @JsonProperty({ name: 'retailer_id' })
    retailerId: string;
    @JsonProperty({ name: 'band_id' })
    brandId: string;
    @JsonProperty({ name: 'manufacturer_id' })
    manufacturerId: string;
    created: Date;
    modified: Date;

    constructor() {
        this.id = undefined;
        this.sku = undefined;
        this.productVersions = undefined;
        this.productMetadatas = undefined;
        this.productFloatmetadatas = undefined;
        this.productIntmetadatas = undefined;
        this.productTxtmetadatas = undefined;
        this.thumbUrl = undefined;
        this.retailerId = undefined;
        this.manufacturerId = undefined;
        this.created = undefined;
        this.modified = undefined;
    }

    extractMeta() {
        this.productMetadatas = {};
        let metaNames = ['productFloatmetadatas', 'productTxtmetadatas', 'productIntmetadatas'];
        metaNames.map(metaName => {
            this[metaName].map(meta => this.productMetadatas[meta['name']] = meta['value']);
        })
        this.productVersions.map( productVersion => {
            productVersion.extractMeta();
            for(let key in productVersion.productVersionMetatadatas) {
                this.productMetadatas[key] = productVersion.productVersionMetatadatas[key];
            }
        });
    }
}