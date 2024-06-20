use proto::greeting_server::{Greeting, GreetingServer};
use tonic::transport::Server;

mod proto {
    tonic::include_proto!("greeting");

    pub(crate) const FILE_DECRIPTOR_SET: &[u8] =
        tonic::include_file_descriptor_set!("greeting_descriptor");
}

#[derive(Debug, Default)]
struct GreetingService {}
#[tonic::async_trait]
impl Greeting for GreetingService {
    async fn greeting(
        &self,
        request: tonic::Request<proto::GreetingRequest>,
    ) -> Result<tonic::Response<proto::GreetingResponse>, tonic::Status> {
        let input = request.get_ref();
        let response = proto::GreetingResponse {
            greetings: format!("Hello {}", input.name),
        };

        return Ok(tonic::Response::new(response));
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let addr = "0.0.0.0:50051".parse()?;
    let gr = GreetingService::default();

    let service = tonic_reflection::server::Builder::configure()
        .register_encoded_file_descriptor_set(proto::FILE_DECRIPTOR_SET)
        .build()?;

    println!("Starting server!");

    Server::builder()
        .accept_http1(true)
        .layer(tower_http::cors::CorsLayer::permissive())
        .add_service(service)
        .add_service(tonic_web::enable(GreetingServer::new(gr)))
        .serve(addr)
        .await?;
    return Ok(());
}
