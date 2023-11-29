export class Product {
  public readonly releaseDateFormat: string;

  public readonly revisionDateFormat: string;

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly logo: string,
    public readonly releaseDate: Date,
    public readonly revisionDate: Date
  ) {
    const [releaseFormat] = this.releaseDate.toISOString().split('T');
    const [revisionFormat] = this.revisionDate.toISOString().split('T');

    this.releaseDateFormat = releaseFormat;
    this.revisionDateFormat = revisionFormat;
  }
}
