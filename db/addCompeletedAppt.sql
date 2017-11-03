insert into appointments (shop_id, start_time, service_id,  barber_id, service_id2, service_id3, status, client_id)
values ($1, $2, $3, $4, $5, $6, $7, $8)
returning *