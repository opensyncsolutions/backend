import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { EnrollmentAnalytics, SharedService } from '@app/opensync';

@Injectable()
export class EnrollmentAnalyticsService extends SharedService<EnrollmentAnalytics> {
  constructor(
    @InjectRepository(EnrollmentAnalytics)
    repository: TreeRepository<EnrollmentAnalytics>,
  ) {
    super(repository, EnrollmentAnalytics);
  }

  generateAnalytics = async (): Promise<void> => {
    try {
      await this.repository.query(
        `DROP TABLE IF EXISTS enrollmentanalytics_temp;`,
      );

      await this.repository.query(
        `
        CREATE TABLE enrollmentanalytics_temp AS
        SELECT * FROM enrollmentanalytics WHERE 1=0;
      `,
      );

      await this.repository.query(`
      INSERT INTO enrollmentanalytics_temp (id, enrollments, ou, created, updated)
      SELECT
      uuid_generate_v4() AS id,
      COUNT(*) AS enrollments,
      COUNT(*) AS eligible,
      COUNT(*) AS non,
      ou,
      CURRENT_TIMESTAMP AS created,
      CURRENT_TIMESTAMP AS updated
      FROM
      enrollment
      GROUP BY
      ou;
  `);

      await this.repository.query(`DROP TABLE enrollmentanalytics;`);

      await this.repository.query(
        `ALTER TABLE enrollmentanalytics_temp RENAME TO enrollmentanalytics;`,
      );

      await this.repository.query(`
      UPDATE objective
      SET enrollments = (
      SELECT COUNT(*)
      FROM enrollment
      WHERE objective = objective.id);
  `);
    } catch (e) {
      console.error(e);
    }
  };
}
