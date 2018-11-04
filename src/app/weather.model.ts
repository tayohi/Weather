export class WeatherModule {

  public city: string;
  public country: string;
  public userId: string;
  public temp: number;
  public wind: string;
  public humidity: number;
  public coordLat: string;
  public coordLong: string;
  public date: Date;

  constructor(city: string, country: string,
    userId: string, temp: number, wind: string, humidity: number, coordLat: string, coordLong: string, date: Date) {
    this.city = city;
    this.country = country;
    this.userId = userId;
    this.temp = temp;
    this.wind = wind;
    this.humidity = humidity;
    this.coordLat = coordLat;
    this.coordLong = coordLong;
    this.date = date;
  }
}
