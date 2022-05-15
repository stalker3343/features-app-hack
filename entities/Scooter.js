export class Scooter {
  static fromContract([id, name, geoId, isRent, rentBy, rentStartTime]) {
    return {
      id,
      name,
      geoId,
      isRent,
      rentBy,
      rentStartTime,
    }
  }

  static toContract(scooter) {
    return [scooter.name, scooter.geoId]
  }

  static getDefaultValue() {
    return {
      name: '',
      geoId: '',
    }
  }
}
