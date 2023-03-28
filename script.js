$(function () {
  function updateHourClasses() {
    const currentHour = dayjs().hour();

    $(".time-block").each(function () {
      const blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).addClass("past").removeClass("present future");
      } else if (blockHour === currentHour) {
        $(this).addClass("present").removeClass("past future");
      } else {
        $(this).addClass("future").removeClass("past present");
      }
    });
  }

  function loadDescriptions() {
    $(".time-block").each(function () {
      const blockId = $(this).attr("id");
      const storedDescription = localStorage.getItem(blockId);

      if (storedDescription) {
        $(this).find(".description").val(storedDescription);
      }
    });
  }

  function displayCurrentDate() {
    const currentDate = dayjs().format("MMMM D, YYYY");
    $("#currentDay").text(currentDate);
  }

  $(".saveBtn").on("click", function () {
    const timeBlock = $(this).closest(".time-block");
    const blockId = timeBlock.attr("id");
    const description = timeBlock.find(".description").val();

    localStorage.setItem(blockId, description);
  });

  updateHourClasses();
  setInterval(updateHourClasses, 60000); // Update hour classes every minute

  loadDescriptions();
  displayCurrentDate();
});
