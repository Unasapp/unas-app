select * from appointments
where shop_id = $1
and status = 'completed'
and start_time between $2 and $3;