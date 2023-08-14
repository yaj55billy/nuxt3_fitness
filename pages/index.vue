<script setup>
const { $bootstrap } = useNuxtApp();

const toastLiveExample = ref(null);
const triggerToast = () => {
	const toast = new $bootstrap.Toast(toastLiveExample.value);
	toast.show();
};
</script>

<template>
	<h1>Index</h1>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<div class="container-fluid">
			<a class="navbar-brand" href="#">Navbar</a>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarNavDropdown"
				aria-controls="navbarNavDropdown"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNavDropdown">
				<ul class="navbar-nav">
					<li class="nav-item">
						<a class="nav-link active" aria-current="page" href="#">Home</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Features</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Pricing</a>
					</li>
					<li class="nav-item dropdown">
						<a
							class="nav-link dropdown-toggle"
							href="#"
							id="navbarDropdownMenuLink"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							Dropdown link
						</a>
						<ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
							<li><a class="dropdown-item" href="#">Action</a></li>
							<li><a class="dropdown-item" href="#">Another action</a></li>
							<li><a class="dropdown-item" href="#">Something else here</a></li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</nav>
	<div
		id="carouselExampleControls"
		class="carousel slide"
		data-bs-ride="carousel"
	>
		<div class="carousel-inner">
			<div class="carousel-item active">
				<img
					src="https://via.placeholder.com/640x427?text=111"
					class="d-block w-100"
					alt="..."
				/>
			</div>
			<div class="carousel-item">
				<img
					src="https://via.placeholder.com/640x427?text=222"
					class="d-block w-100"
					alt="..."
				/>
			</div>
			<div class="carousel-item">
				<img
					src="https://via.placeholder.com/640x427?text=abc"
					class="d-block w-100"
					alt="..."
				/>
			</div>
		</div>
		<button
			class="carousel-control-prev"
			type="button"
			data-bs-target="#carouselExampleControls"
			data-bs-slide="prev"
		>
			<span class="carousel-control-prev-icon" aria-hidden="true"></span>
			<span class="visually-hidden">Previous</span>
		</button>
		<button
			class="carousel-control-next"
			type="button"
			data-bs-target="#carouselExampleControls"
			data-bs-slide="next"
		>
			<span class="carousel-control-next-icon" aria-hidden="true"></span>
			<span class="visually-hidden">Next</span>
		</button>
	</div>
	<Test />

	<button
		type="button"
		class="btn btn-primary"
		id="liveToastBtn"
		@click="triggerToast"
	>
		Show live toast
	</button>

	<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
		<div
			id="liveToast"
			class="toast hide"
			ref="toastLiveExample"
			role="alert"
			aria-live="assertive"
			aria-atomic="true"
		>
			<div class="toast-header">
				<strong class="me-auto">Bootstrap</strong>
				<small>11 mins ago</small>
				<button
					type="button"
					class="btn-close"
					data-bs-dismiss="toast"
					aria-label="Close"
				></button>
			</div>
			<div class="toast-body">Hello, world! This is a toast message.</div>
		</div>
	</div>
	<!-- Button trigger modal -->
	<button
		type="button"
		class="btn btn-primary"
		data-bs-toggle="modal"
		data-bs-target="#exampleModal"
	>
		Launch demo modal
	</button>

	<!-- Modal -->
	<div
		class="modal fade"
		id="exampleModal"
		tabindex="-1"
		aria-labelledby="exampleModalLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
					></button>
				</div>
				<div class="modal-body">...</div>
				<div class="modal-footer">
					<button
						type="button"
						class="btn btn-secondary"
						data-bs-dismiss="modal"
					>
						Close
					</button>
					<button type="button" class="btn btn-primary">Save changes</button>
				</div>
			</div>
		</div>
	</div>

	<p>
		<a
			class="btn btn-primary"
			data-bs-toggle="collapse"
			href="#collapseExample"
			role="button"
			aria-expanded="false"
			aria-controls="collapseExample"
		>
			Link with href
		</a>
		<button
			class="btn btn-primary"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#collapseExample"
			aria-expanded="false"
			aria-controls="collapseExample"
		>
			Button with data-bs-target
		</button>
	</p>
	<div class="collapse" id="collapseExample">
		<div class="card card-body">
			Some placeholder content for the collapse component. This panel is hidden
			by default but revealed when the user activates the relevant trigger.
		</div>
	</div>
</template>

<style scoped></style>
