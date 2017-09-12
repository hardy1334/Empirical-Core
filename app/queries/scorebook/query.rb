class Scorebook::Query
  SCORES_PER_PAGE = 200

  def self.run(current_page=1, classroom_id=nil, unit_id=nil, begin_date=nil, end_date=nil)
    ActiveRecord::Base.connection.execute(
    "SELECT acts.user_id,
       ca.id AS ca_id,
       students.name AS name,
       activity.activity_classification_id,
       MAX(acts.updated_at) AS updated_at,
       MAX(acts.percentage) AS percentage
    FROM classrooms AS classroom
    LEFT JOIN students_classrooms AS sc on sc.classroom_id = classroom.id
    RIGHT JOIN users AS students ON students.id = sc.student_id
    INNER JOIN classroom_activities AS ca ON ca.classroom_id = classroom.id
    INNER JOIN activity_sessions AS acts ON (
          acts.classroom_activity_id = ca.id
          AND acts.user_id = students.id
          )
    INNER JOIN activities AS activity ON activity.id = ca.activity_id
    WHERE classroom.id = #{classroom_id}
    AND acts.visible = true
    AND ca.visible = true
    AND sc.visible = true
    #{self.units_if_necessary(unit_id)}
    GROUP BY acts.user_id, students.name, ca.id, activity.activity_classification_id
    ORDER BY  substring(students.name, E'([^\\s]+)(,|$)'), ca.created_at ASC
    OFFSET (#{(current_page.to_i - 1) * SCORES_PER_PAGE})
    FETCH NEXT #{SCORES_PER_PAGE} ROWS ONLY"
    ).to_a
  end

  def self.units_if_necessary(unit_id)
    if unit_id && !unit_id.blank?
      "AND unit.id = #{unit_id}"
    end
  end


end
