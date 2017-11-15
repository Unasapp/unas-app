insert into appointments (barber_id, client_id, service_id, shop_id, start_time, end_time)
 values ($1, $2, $3, $4, $5, $6)
 returning *
