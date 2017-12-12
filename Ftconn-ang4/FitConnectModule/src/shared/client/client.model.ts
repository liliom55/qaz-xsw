// import { Client, ClientMetadata, ClientCapture, ClientCaptureMetric, ClientMetrics }

//Use decorator JsonProperty to describe how the util should map a Json Object from the server to one of theses classes
//Note: order of definition is important (see https://github.com/jf3096/json-typescript-mapper/issues/19)
//Note: constructors are used in the json-mapper (new Clazz()); careful when changing them
import { JsonProperty } from '../helpers/map.utils';

export class ClientMetadata {
  id: string;
  @JsonProperty({ name: 'client_id' })
  clientId: string;
  name: string;
  value: string;
  created: Date;
  modified: Date;

  constructor(name?: string, value?: string, clientId?: string) {
    this.id = undefined;
    this.clientId = undefined;
    this.name = undefined;
    this.value = undefined;
    this.created = undefined;
    this.modified = undefined;
    if (name) {
      this.name = name;
    }
    if (value) {
      this.value = value;
    }
    if (clientId) {
      this.clientId = clientId;
    }
  }
}

export class ClientCaptureMetric {
  id: string;
  @JsonProperty({ name: 'client_capture_id' })
  clientCaptureId: string;
  type: string;
  value: number;
  created: Date;
  modified: Date;

  constructor(type?: string, value?: number) {
    this.id = undefined;
    this.clientCaptureId = undefined;
    this.type = undefined;
    this.value = undefined;
    this.created = undefined;
    this.modified = undefined;
    if (type) {
      this.type = type;
    }
    if (value || value == 0) {
      this.value = value;
    }

  }

  readyToSend(): Object {
    return {
      type: this.type, value: this.value
    };
  }
}

export class ClientCapture {
  id: string;
  @JsonProperty({ name: 'client_id' })
  clientId: string;
  @JsonProperty({ name: 'client_capture_metrics', clazz: ClientCaptureMetric })
  clientCaptureMetrics: ClientCaptureMetric[];
  created: Date;
  modified: Date;

  constructor(id?: string, clientId?: string, clientCaptureMetrics?: ClientCaptureMetric[]) {
    this.id = undefined;
    this.clientId = undefined;
    this.clientCaptureMetrics = undefined;
    this.created = undefined;
    this.modified = undefined;
    if (id) this.id = id;
    if (clientId) this.clientId = clientId;
    if (clientCaptureMetrics) this.clientCaptureMetrics = clientCaptureMetrics;
  }
}

export class Client {
  id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  anonymous: number;
  created: Date;
  modified: Date;
  @JsonProperty({ name: "client_metrics" })
  clientMetrics: Object;
  @JsonProperty({ name: "client_metadatas", clazz: ClientMetadata })
  clientMetadatas: ClientMetadata[];
  clientCaptures: ClientCapture[];

  constructor() {

    this.id = undefined;
    this.email = undefined;
    this.password = undefined;
    this.firstname = undefined;
    this.lastname = undefined;
    this.anonymous = undefined;
    this.created = undefined;
    this.modified = undefined;
    this.clientMetadatas = undefined;
    this.clientMetrics = undefined;

  }
}